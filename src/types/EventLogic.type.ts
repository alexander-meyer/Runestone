import type { Player } from "./Player.class";
import type { Game } from "../types/Game.class";

export type EventLogic = (
  (player: Player, flavor_text: string, item_reward: string, game_instance: Game) => void
);
