import type { events } from "./events";

const DIRECTIONS = [ "north", "south", "east", "west" ] as const;
type Direction = typeof DIRECTIONS[number];

const ROOMS = [
  "meadow",
  "structure",
  "orchard",
  "water",
  "hill",
  "trees",
  "bees",
  "cabin",
  "campfire"
] as const;
type RoomName = typeof ROOMS[number];

type RoomData = {
  flavor_text: string
  nearby_text: string,
  exits: { [key in Direction]: RoomName | null },
  examine: { [key: string]: string } | null,
  item: string | null,
  event: keyof typeof events | null
};

type world_data = { [key in RoomName]: RoomData}

export const world: world_data = {
  meadow: {
    flavor_text:
      "You find yourself in a meadow. <br/><br/> A gentle breeze blows through, causing the grass to dance and sway.",
    nearby_text:
      "lies a small clearing",
    exits: {
      north: "hill",
      south: "structure",
      east: "water",
      west: "bees"
    },
    examine: null,
    item: null,
    event: null
  },
  structure: {
    flavor_text:
      "You arrive at a modest shrine. <br/><br/> The wooden walls are old and crumbling - the building seems to have been abandoned for some time now. Inside you see a raised altar.",
    nearby_text:
      "stands a small structure",
    exits: {
      north: "meadow",
      south: "orchard",
      east: null,
      west: null
    },
    examine: {
      altar: "There\"s a small groove in the center, about the size of your fist. You get a feeling that something used to rest here."
    },
    item: null,
    event: null
  },
  orchard: {
    flavor_text:
      "You stand in the midst of an overgrown orchard. <br/><br/> Fruit trees surround you on all sides, suffusing the air with a delightful aroma. One tree in particular, covered in white blossoms, dwarfs the others.",
    nearby_text:
      "you see some sort of orchard",
    exits: {
      north: "structure",
      south: null,
      east: null,
      west: null
    },
    examine: {
      tree: "Small white flowers cover the entire tree. Looking at it fills you with a sense of calm. You notice several ripe pears dangling from a low-hanging branch."
    },
    item: "Pear",
    event: "pluck"
  },
  water: {
    flavor_text:
      "You come to the bank of a river. <br/><br/> Bullfrogs ring out in chorus from somewhere along the shore. The water looks cool and pleasant.",
    nearby_text:
      "you hear the sound of rushing water",
    exits: {
      north: null,
      south: null,
      east: null,
      west: "meadow"
    },
    examine: null,
    item: "Amethyst Ring",
    event: "swim"
  },
  hill: {
    flavor_text:
      "You reach the top of the hill. <br/><br/> Trees obscure much of your view, but you can see a thick plume of smoke far off to the northwest.",
    nearby_text:
      "a large hill rises from the ground",
    exits: {
      north: "trees",
      south: "meadow",
      east: null,
      west: null
    },
    examine: null,
    item: null,
    event: null
  },
  trees: {
    flavor_text:
      "You stand at the entrance to a forest. <br/><br/> Looming pines make it too dark to see without some way to illuminate the path.",
    nearby_text:
      "stands a particularly thick cropping of trees",
    exits: {
      north: null,
      south: "hill",
      east: null,
      west: null
    },
    examine: null,
    item: null,
    event: null
  },
  bees: {
    flavor_text:
      "You come to a field of golden dandelions. <br/><br/> Honeybees drift from plant to plant, giving rise to a dull buzzing sound.",
    nearby_text:
      "you can hear a gentle humming sound",
    exits: {
      north: "campfire",
      south: null,
      east: "meadow",
      west: null
    },
    examine: null,
    item: null,
    event: null
  },
  cabin: {
    flavor_text:
      "You stumble upon an old cabin. Inside you see what was once ornate furniture and various papers strewn about.",
    nearby_text:
      "",
    exits: {
      north: "trees",
      south: null,
      east: null,
      west: null
    },
    examine: null,
    item: null,
    event: null
  },
  campfire: {
    flavor_text: "You arrive at a clearing in the trees. <br/><br/> In the center lies the remains of a campfire, its stone perimeter beautifully arranged in a perfect circle.",
    nearby_text: "you can taste the scent of smoke",
    exits: {
      north: null,
      south: "bees",
      east: null,
      west: null
    },
    examine: {
      campfire: "You peer into the burned-out fire. Bones from a previous meal are scattered throughout and - whats this? There's a small box on one of the perimeter stones."
    },
    item: "Matches",
    event: "matchbox"
  }
};
