<script lang="ts">
  import { onMount } from "svelte";
  import { Game } from "./types/Game.class";
  import { world } from "./data/world";

  let game: Game;
  let user_input: string;

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Duis ut diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Duis ut diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Duis ut diam quam nulla porttitor massa id.";

  onMount(function() {
    game = new Game("meadow", world)
  })

  function handle_key_press(event: KeyboardEvent) {
    if (event.key == "Enter") {
      game.parse_input(user_input)
    }
  }

</script>

<div class="game-screen">
  <div id="game-text"/>
  <div class="input-container">
    <span class="input-indicator">></span>
    <input id="user-input" placeholder="What do you do?" on:keypress={handle_key_press} bind:value={user_input}/>
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

  .input-container {
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
