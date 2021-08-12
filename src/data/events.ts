import { Item } from "../types/Item.class";
import { art } from "../data/art";
import dom_utils from "../util/dom";
import type { Player } from "../types/Player.class";
import logic_utils from "../util/logic";
import type { Game } from "../types/Game.class";

export const events = {
  swim: {
    flavor_text: "You leap gracefully off a protruding rock, landing with minimal splash. The water welcomes you with a cool embrace.",
    item: "Amethyst Ring",
    triggers: ["swim", "swimming", "dive", "jump"],
    conditions_met: function (player_input: string[], triggers: string[]) {
      return logic_utils.has_overlap(player_input, triggers) != null;
    },
    item_needed: "none",
    event_logic: function (player: Player, flavor_text: string, item_reward: string,  game: Game) {
      dom_utils.append_text(flavor_text);

      if (!player.has_item(item_reward)) {
        player.add_item(new Item(item_reward));
        dom_utils.append_text(
          `Something catches your eye on the riverbed...<br/><br/> <pre>${art.ring}<pre/> * Amethyst Ring added to inventory *<br/>`,
          false
        );
      }
    }
  },
  pluck: {
    flavor_text: "You reach up and pluck a particularly fine specimen, dark red and smelling of sweetness.",
    item: "Pear",
    triggers: ["pear", "take", "pick", "pluck", "grab"],
    conditions_met: function (player_input: string | string[], triggers: string[]) {
      const array_player_input = (
        Array.isArray(player_input)
          ? player_input
          : [player_input]
      );
      const filteredArray = array_player_input.filter(word => triggers.includes(word));

      return (filteredArray.length > 1 && filteredArray.includes("pear"));
    },
    item_needed: "",
    event_logic: function (player: Player, flavor_text: string, item_reward: string,  game: Game) {

      if (player.has_item(item_reward)) {
        dom_utils.append_text("Best not to be greedy. <br/>");
      }
      else {
        player.add_item(new Item(item_reward));
        dom_utils.append_text(flavor_text + `<pre>${art.pear}<pre/>` + "* Pear added to inventory *<br/>");
      }
    }
  },
  matchbox: {
    flavor_text: "You grab the item. Upon closer inspection, you realize that its an old box of matches! Its covered in soot, but still appears to be functional.",
    item: "Matches",
    triggers: ["take", "grab", "pick", "up", "box"],
    conditions_met: function (player_input: string | string[], triggers: string[]) {
      const array_player_input = (
        Array.isArray(player_input)
          ? player_input
          : [player_input]
      );
      const filteredArray = array_player_input.filter(word => triggers.includes(word));

      return (filteredArray.length > 1 && filteredArray.includes("box"));
    },
    item_needed: "",
    event_logic: function (player: Player, flavor_text: string, item_reward: string, game: Game) {

      if (!player.has_item(item_reward)) {
        player.add_item(new Item(item_reward));
        dom_utils.append_text(flavor_text + `<pre>${art.matches}<pre/>` + "* Matches added to inventory *<br/>");
        game.change_examine_text(
          "campfire",
          "You peer into the burned-out fire. Bones from a previous meal are scattered throughout."
        );
      }
    }
  }

};
