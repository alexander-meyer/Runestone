export const world = {
  meadow: {
    flavorText:
      'You find yourself in a meadow. <br/><br/> A gentle breeze blows through, causing the grass to dance and sway.',
    nearbyText:
      'lies a small clearing',
    exits: {
      north: 'hill',
      south: 'structure',
      east: 'water'
    },
    examine: {},
    item: '',
  },
  structure: {
    flavorText:
      'You arrive at a modest shrine. <br/><br/> The wooden walls are old and crumbling - the building seems to have been abandoned for some time now. Inside you see a raised altar.',
    nearbyText:
      'stands a small structure',
    exits: {
      north: 'meadow',
      south: 'orchard'
    },
    examine: {
      altar: 'There\'s a small groove in the center, about the size of your fist. You get the sense that something used to rest here.'
    }
  },
  orchard: {
    flavorText:
      'You stand in the midst of an overgrown orchard. <br/><br/> Fruit trees surround you on all sides, suffusing the air with a delightful aroma. One tree in particular, covered in white blossoms, dwarfs the others.',
    nearbyText:
      'you see some sort of orchard',
    exits: {
      north: 'structure'
    },
    examine: {
      tree: 'Small white flowers cover the entire tree. Looking at it fills you with a sense of calm. You notice several ripe pears dangling from a low-hanging branch.'
    },
    item: 'Pear',
    event: 'pluck'
  },
  water: {
    flavorText:
      'You come to the bank of a river. <br/><br/> A large red dragonfly twirls through the air, racing past a pair of sunbathing turtles. The water looks cool and pleasant.',
    nearbyText:
      'you hear the sound of rushing water',
    exits: {
      west: 'meadow'
    },
    examine: {},
    item: 'Amethyst Ring',
    event: 'swim'
  },

  hill: {
    flavorText:
      'You reach the top of the hill. <br/><br/> Trees obscure much of your view, but you can see a thick plume of smoke far off to the northwest.',
    nearbyText:
      'a large hill rises from the ground',
    exits: {
      north: 'trees',
      south: 'meadow'
    },
    examine: {}
  },
  trees: {
    flavorText:
      'You stand at the entrance to a forest. <br/><br/> Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?',
    nearbyText:
      'stands a particularly thick cropping of trees',
    exits: {
      south: 'hill'
    },
    examine: {}
  },
  bees: {
    flavorText:
      'You come to a garden of golden dandelions. <br/><br/> Honeybees drift from plant to plant, giving rise to a dull buzzing sound throughout the field. In the center of the scene lie several strange boxes, and bent over one of these is a hooded figure.',
    nearbyText:
      'you hear a gentle humming sound',
    exits: {
    },
  },
  cabin: {
    flavorText:
      'You stumble upon an old cabin. Inside you see what was once ornate furniture and various papers strewn about.',
    exits: {
      north: 'trees'
    },
    examine: {
    }
  }
};
