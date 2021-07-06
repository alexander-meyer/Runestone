import { Item } from "../types/Item.class";
import { art } from "../data/art";
import dom_utils from "../util/dom";
import type { Player } from "../types/Player.class";

export const events = {
  swim: {
      flavor_text: "You leap gracefully off a protruding rock, landing with minimal splash - an applause-worthy dive.",
      item: "Amethyst Ring",
      triggers: ["swim", "swimming", "dive", "jump"],
      conditions_met: function(player_input, triggers) {
          //return isValidCommand(player_input, triggers);
          return true;
      },
      item_needed: "none",
      event_logic: function(player: Player, flavor_text: string, item_reward: string) {
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
      conditions_met: function(player_input: string | string[], triggers: string[]) {

        const array_player_input = (
          Array.isArray(player_input)
          ? player_input
          : [player_input]
        )
        const filteredArray = array_player_input.filter(word => triggers.includes(word))

        return (filteredArray.length > 1 && filteredArray.includes("pear"));
      },
      item_needed: "",
      event_logic: function(player: Player, flavor_text: string, item_reward: string) {

          if (player.has_item(item_reward)) {
            dom_utils.append_text("Best not to be greedy. <br/><br/>", false)
          }
          else {
              player.add_item(new Item(item_reward));
              dom_utils.append_text(flavor_text + `<pre>${art.pear}<pre/>` + "* Pear added to inventory *<br/>", false);
          }
      }
  }

};
