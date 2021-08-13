<script lang="ts">
  import { fade } from "svelte/transition";
  import GameScreen from "./GameScreen.svelte";

  enum TransitionState {
    Start,
    Loading,
    Game
  };

  let current_state = TransitionState.Game;
  let paused = false;
  let items_found = 0;

  const infoScreen = `This is a petite adventure where you traverse different areas to discover secrets and solve puzzles. Some of the basic commands are:
    <ul>
    <li><b>go</b> _____ : move between rooms</li>
    <li><b>examine</b> : investigate a particular object</li>
    <li><b>bag</b> : check the contents of your inventory</li>
    <li><b>where am I</b> : information about your current location</li>
    </ul>
    Areas may also contain hidden triggers that respond to additional prompts. Type <i>help</i> at any time to bring up this info. <br/>
  `;

  function switch_to_game() {
    current_state = TransitionState.Game;
  }
</script>

<main>
  <div class="container">
    {#if current_state == TransitionState.Start}
      <div out:fade={{duration: 1500}} on:outroend={switch_to_game}>
        <h1 class="title">Runestone</h1>
        <audio bind:paused>
          <source src="src/fire-crackling-noise.mp3" type="audio/mpeg" />
          <track kind="captions" />
        </audio>
        <div class="start-screen">
          <span>{@html infoScreen}</span>
          <button
            class="start-button"
            on:click={function () {
              current_state = TransitionState.Loading;
            }}>Start</button
          >
        </div>
      </div>
    {:else if current_state == TransitionState.Game}
      <GameScreen on:item_found={ function() { items_found++; } }/>
    {/if}
  </div>
  <span class="item-tracker">Items found: {items_found}/3</span>
</main>

<style>
  main {
    display: flex;
    color: rgb(70, 54, 30);
    background-color: #fff5e2;
    height: 100vh;
  }

  .title {
    font: bold 4em "Lora", serif;
    text-align: center;
  }

  .container {
    margin: 0 2em 0 10%;
    width: 70%;
    height: 80%;
    padding-top: 2em;
  }

  .start-screen {
    display: flex;
    flex-direction: column;
    font-family: "Lora", serif;
  }

  .start-screen > button {
    background-color: rgb(70, 54, 30);
    border: none;
    border-radius: 4px;
    color: rgb(238, 238, 238);
    cursor: pointer;
    font-size: 1.2em;
    font-family: "Lora", serif;
    height: 2.5em;
    margin: auto;
    opacity: 0.8;
    transition-duration: 0.4s;
    width: 5em;
  }

  .start-button:hover {
    opacity: 1;
  }

  .item-tracker {
    margin-top: 2em;
  }
</style>
