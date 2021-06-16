export const events = {
  swim: {
      flavor_text: "You leap gracefully off a protruding rock, landing with minimal splash - an applause-worthy dive.",
      item: "Amethyst Ring",
      triggers: ['swim', 'swimming', 'dive', 'jump'],
      conditions_met: function(playerInput, triggers) {
          return isValidCommand(playerInput, triggers);
      },
      item_needed: 'none',
      event_logic: function(player, flavorText, itemReward) {
          appendTextAndScroll(flavorText);

          if (!player.hasItem(itemReward)) {
              player.addItem(new Item(itemReward));
              appendTextAndScroll(`Something catches your eye on the riverbed...<br/><br/> <pre>${art.ring}<pre/> * Amethyst Ring added to inventory *<br/>`);
          }
      }
  },
  pluck: {
      flavor_text: 'You reach up and pluck a particularly fine specimen, dark red and smelling of sweetness.',
      item: 'Pear',
      triggers: ['pear', 'take', 'pick', 'pluck', 'grab'],
      conditions_met: function(playerInput, triggers) {

          if (!Array.isArray(playerInput)) {
              playerInput = [playerInput];
          }
          const filteredArray = playerInput.filter(word => triggers.includes(word))
          return (filteredArray.length > 1 && filteredArray.includes('pear'));
      },
      item_needed: '',
      event_logic: function(player, flavorText, itemReward) {

          if (player.hasItem(itemReward)) {
              appendTextAndScroll('Best not to be greedy. <br/><br/>')
          }
          else {
              player.addItem(new Item(itemReward));
              appendTextAndScroll(flavorText + `<pre>${art.pear}<pre/>` + '* Pear added to inventory *<br/>');
          }
      }
  }

};
