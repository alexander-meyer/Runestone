<script lang="ts">
  import { onMount } from "svelte";
  import { Game } from "./types/Game.class";
  import { world } from "./data/world";

  let game: Game;
  let user_input: string;
  let show_start = false;

  const infoScreen = `This is a petite adventure where you traverse different areas to discover secrets and solve puzzles. Some of the basic commands are:
    <ul>
    <li><b>go</b> _____ : move between rooms</li>
    <li><b>examine</b> : investigate a particular object</li>
    <li><b>bag</b> : check the contents of your inventory</li>
    <li><b>where am I</b> : information about your current location</li>
    </ul>
    Areas may also contain hidden triggers that respond to additional prompts. Type <i>help</i> at any time to bring up this info. <br/><br/>
  `

  onMount(function() {
    game = new Game("meadow", world)
  })

  function handle_key_press(event: KeyboardEvent) {
    if (event.key == "Enter") {
      game.parse_input(user_input)
    }
  }

</script>

<main>
  <div class="container">
    {#if show_start}
      <h1 class="title">Runestone</h1>
      <div class="start-screen">
        <span>{@html infoScreen}</span>
        <button class="start-button" on:click= { function() { show_start = false; } }>Start</button>
      </div>
    {:else}
      <div class="game-screen">
        <div id="game-text"/>
        <div class="input-container">
          <span class="input-indicator">></span>
          <input id="user-input" placeholder="What do you do?" on:keypress={handle_key_press} bind:value={user_input}/>
        </div>
      </div>
    {/if}
  </div>
</main>


<style>
  main {
    color: rgb(70, 54, 30);
    height: 100%
  }

  .title {
    font: bold 4em 'Lora', serif;
    text-align: center;
  }

  .container {
    margin: 2em auto;
    width: 70%;
    height: 80%;
  }

  .start-screen {
    display: flex;
    flex-direction: column;
    font-family: 'Lora', serif;
  }

  .start-screen > button {
    background-color: rgb(70, 54, 30);
    border: none;
    border-radius: 4px;
    color: rgb(238, 238, 238);
    cursor: pointer;
    font-size: 1.2em;
    font-family: 'Lora', serif;
    height: 2.5em;
    margin: auto;
    opacity: 0.8;
    transition-duration: 0.4s;
    width: 5em;
  }

  .start-button:hover {
    opacity: 1;
  }

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
