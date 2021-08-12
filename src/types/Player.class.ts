import type { Item } from "./Item.class";

export class Player {
  readonly inventory: {[key:string]: Item}

  constructor() {
      this.inventory = {};
  }

  add_item(item: Item) {
      this.inventory[item.name] = item;
  }

  has_item(item_name: string) {
      return this.inventory[item_name] == undefined ? false : true;
  }

  get_items() {
    return Object.keys(this.inventory);
  }
}
