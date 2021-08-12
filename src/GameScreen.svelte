<script lang="ts">
  import { onMount } from "svelte";
  import { Game } from "./types/Game.class";
  import { world } from "./data/world";
  import { fade } from "svelte/transition";

  let game: Game;
  let user_input: string;

  onMount(function () {
    game = new Game("meadow", world);
  });

  function handle_key_press(event: KeyboardEvent) {
    if (event.key == "Enter") {
      game.parse_input(user_input);
    }
  }
</script>

<div class="game-screen" transition:fade={{duration: 2500}}>
  <div id="game-text" />
  <div class="input">
    <span class="input-indicator">></span>
    <input
      id="user-input"
      placeholder="What do you do?"
      on:keypress={handle_key_press}
      bind:value={user_input}
    />
  </div>
</div>

<style>
  .game-screen {
    height: 90%;
    font-family: "Lora", serif;
  }

  #game-text {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .input {
    display: flex;
    margin: 2em auto;
  }

  .input-indicator {
    margin-right: 0.2em;
  }

  #user-input {
    background: transparent;
    border: none;
    border-radius: 7px;
    font: italic 1em "Lora", serif;
    width: 97%;
  }
</style>
