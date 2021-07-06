import type { Player } from "./Player.class";

export type EventLogic = (
  (player: Player, flavor_text: string, item_reward: string) => void
);
