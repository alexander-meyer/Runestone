import { events } from "../data/events";
import { world } from "../data/world";
import dom_utils from "../util/dom";
import { Item } from "./Item.class";
import { Player } from "./Player.class";
import logic_utils from "../util/logic";
import type { EventLogic } from "./EventLogic.type";
import type { ConditionsMet } from "./ConditionsMet.type";
import dom from "../util/dom";

// Static constants

const EXAMINE_WORDS = ["investigate", "examine"];
const MOVEMENT_WORDS = ["go", "move", "run", "exit", "walk"];
const DIRECTION_WORDS = ["north", "forward", "west", "left", "right", "east", "south"];
const INVENTORY_WORDS = ["bag", "inventory", "items"];

const DIRECTIONS = ["north", "south", "east", "west"] as const;

// Building block types

type Direction = typeof DIRECTIONS[number];

type RoomExit = keyof typeof world;

type RoomData = {
  flavor_text: string;
  nearby_text: string,
  exits: { [key in Direction]: RoomExit | null },
  examine: { [key: string]: string; } | null,
  item: string | null,
  event: keyof typeof events | null;
};

type EventData = {
  flavor_text: string,
  item: string,
  triggers: string[],
  conditions_met: ConditionsMet,
  item_needed: string | null,
  event_logic: EventLogic;
};

// Helper functions

function bad_command() {
  dom_utils.append_text("Not sure what you mean.");
}

function is_room_exit(value: string): value is RoomExit {
  return Object.keys(world).includes(value);
}

// Class logic

class GameEvent {
  readonly flavor_text: string;
  readonly item_reward: string | null;
  readonly item_needed: string | null;
  readonly triggers: string[];
  readonly conditions_met: ConditionsMet;
  readonly logic: EventLogic;

  constructor(
    flavor_text: string,
    item_reward: string | null,
    item_needed: string | null,
    trigger_words: string[],
    conditions_met: ConditionsMet,
    event_function: EventLogic
  ) {
    this.flavor_text = flavor_text;
    this.item_reward = item_reward;
    this.item_needed = item_needed;
    this.triggers = trigger_words;
    this.conditions_met = conditions_met;
    this.logic = event_function;
  }

  play_event() {
    this.logic;
  }
}

class Room {
  readonly flavor_text: string;
  readonly nearby_text: string;
  examine: { [key: string]: string; } | null;
  readonly exits: { [key in Direction]: RoomExit };
  item: Item | null;
  readonly event: GameEvent | null;

  constructor(
    flavor_text: string,
    nearby_text: string,
    examine: { [key: string]: string; } | null,
    exits: { [key in Direction]: RoomExit },
    items: Item | null,
    event_name: keyof typeof events | null
  ) {
    this.flavor_text = flavor_text;
    this.nearby_text = nearby_text;
    this.examine = examine;
    this.exits = exits;
    this.item = items;

    if (event_name == null) {
      this.event = null;
    } else {
      const event_data: EventData = events[event_name];
      this.event = new GameEvent(
        event_data.flavor_text,
        event_data.item,
        event_data.item_needed,
        event_data.triggers,
        event_data.conditions_met,
        event_data.event_logic
      );
    }
  }

  remove_item() {
    this.item = null;
  }

  has_event() {
    return this.event == null ? false : true;
  }

  public neighboring_rooms() {
    return Object.values(this.exits);
  }
}

export class Game {
  readonly world: { [key in keyof typeof world]: Room } | {} = {};
  current_room: Room;
  room_exits: RoomExit[];
  readonly player: Player;

  public constructor(
    starting_room_name: keyof typeof world,
    world_data: { [key in keyof typeof world]: RoomData }
  ) {
    this.room_exits = [];
    this.player = new Player();

    for (const [room_name, room] of Object.entries(world_data)) {
      this.world[room_name] = new Room(
        room.flavor_text,
        room.nearby_text,
        room.examine,
        room.exits,
        new Item(room.item),
        room.event
      );
    }

    this.current_room = this.world[starting_room_name];
    this.room_exits = this.current_room.neighboring_rooms();

    this.display_room_text(false);
    this.display_exits();
  }

  private mentions_item(user_input: string[]) {
    const items = this.player.get_items();
    return logic_utils.has_overlap(user_input, items);
  }

  public get_event() {
    return this.current_room.event;
  }

  public get_interactives() {
    return this.current_room.examine;
  }

  public display_room_text(include_user_input = true) {
    dom_utils.append_text(this.current_room.flavor_text, include_user_input);
  }

  public change_room(direction: string) {
    switch (direction) {
      case "forward":
        direction = "north";
        break;
      case "left":
        direction = "west";
        break;
      case "right":
        direction = "east";
        break;
    }
    const current_room_exits = this.current_room.exits;

    // north, south, east, etc...
    if ((current_room_exits[direction]) != undefined) {
      const new_room_name = current_room_exits[direction];
      this.current_room = this.world[new_room_name];
      this.display_room_text();
      this.display_exits();
    }
    // river, forest, hill, etc...
    else if (is_room_exit(direction) && this.room_exits.includes(direction)) {
      for (let key of Object.keys(current_room_exits)) {
        if (direction == current_room_exits[key]) {
          this.current_room = this.world[direction];
        }
      }
      this.display_room_text();
      this.display_exits();
    }
    else {
      dom_utils.append_text("you can\"t go that way.<br/>");
    }

    this.room_exits = this.current_room.neighboring_rooms();
  }

  public display_exits() {
    const room_exits = this.current_room.exits;

    const exits_text = Object.entries(room_exits).reduce(
      function (accum, [direction, room]) {
        return (
          room_exits[direction] == null
            ? accum + ""
            : accum + "to the <b>" + direction + " </b>" + world[room].nearby_text + ".<br/>"
        );
      },
      ""
    );

    dom_utils.append_text(exits_text, false);
  }

  public display_inventory() {
    const inventory = this.player.inventory;
    if (Object.entries(inventory).length == 0) {
      dom_utils.append_text("nothing in your bag.");
    } else {
      const inventory_text = Object.keys(inventory).reduce(
        function (accum, current) {
          return accum + "~ " + current + "<br/>";
        },
        ""
      );

      dom_utils.append_text(inventory_text);
    }
  }

  public examine_room(parsed_input: string[]) {

    const interactive_object = this.get_interactives();
    const valid_element = logic_utils.find_valid_command(
      parsed_input,
      Object.keys(interactive_object)
    );

    if (valid_element != null) {
      dom_utils.append_text(interactive_object[valid_element] + "<br/>");
    } else {
      dom_utils.append_text("Not much to tell, really. <br/>");
    }
  }

  public try_event(parsed_input: string[]) {
    const current_event = this.current_room.event;

    if (current_event.conditions_met(parsed_input, current_event.triggers)) {
      current_event.logic(
        this.player,
        current_event.flavor_text,
        current_event.item_reward,
        this
      );
    } else {
      bad_command();
    }
  }

  public change_examine_text(feature: string, new_flavor_text: string) {
    this.current_room.examine[feature] = new_flavor_text;
  }

  public parse_input(input: string) {
    let parsed_input = input.toLowerCase().split(" ");
    const mentioned_item = (
      this.player.inventory == {}
      ? null
      : this.mentions_item(parsed_input)
    );

    if (MOVEMENT_WORDS.concat(DIRECTION_WORDS).includes(parsed_input[0])) {
      if (parsed_input.length == 1) {
        const word = parsed_input[0];
        if (MOVEMENT_WORDS.includes(word)) {
          dom_utils.append_text("Where? <br/>");
        } else if (Object.keys(this.current_room.exits).includes(word)) {
          this.change_room(word);
        } else {
          bad_command();
        }
      } else {
        debugger;
        const directionToMove = logic_utils.find_valid_command(parsed_input, DIRECTION_WORDS.concat(this.room_exits));
        if (directionToMove != null) {
          this.change_room(directionToMove);
        } else {
          bad_command();
        }
      }
    } else if (EXAMINE_WORDS.includes(parsed_input[0])) {
      this.examine_room(parsed_input);
    } else if (logic_utils.find_valid_command(parsed_input, INVENTORY_WORDS) != null) {
      this.display_inventory();
    } else if (parsed_input.includes("help")) {
      dom_utils.help_message();
    } else if (
      logic_utils.arrays_are_equal(parsed_input, ["where", "am", "i"])
      || logic_utils.arrays_are_equal(parsed_input, ["look", "around"])
    ) {
      dom_utils.append_text(this.current_room.flavor_text);
      this.display_exits();
    } else if (mentioned_item != null) {
      dom_utils.append_text("Do what with " + mentioned_item + "? <br/>");
    } else if (parsed_input.includes("dance")) {
      dom_utils.append_text("you gyrate in place, swinging your arms back and forth. A shame no one is around to admire.<br/>");
    } else if (this.current_room.event != null) {
      this.try_event(parsed_input);
    } else {
      if (parsed_input.length == 1) {
        if (this.current_room.event != null && this.get_event().triggers.includes(parsed_input[0])) {
          this.try_event(parsed_input);
        } else {
          bad_command();
        }
      } else {
        bad_command();
      }
    }
  }

}
