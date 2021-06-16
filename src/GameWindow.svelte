<script lang="ts">
import { afterUpdate, beforeUpdate } from "svelte";
import { smoothScroll } from "./util/dom";

  let input = "";
  let div: HTMLElement;
  let should_autoscroll: boolean;

  beforeUpdate(function() {
    should_autoscroll = div && (div.scrollHeight > div.offsetHeight)
  })

  afterUpdate(function() {
    if (should_autoscroll) {
      smoothScroll(2200, div, div.scrollHeight)
    }
  })

  function handle_key_press(event: KeyboardEvent) {
    const game_text = document.getElementsByClassName("game-text").item(0);

    if (event.key == "Enter") {
      game_text.innerHTML += "> <i>" + input + "</i><br/> <br/>" +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Duis ut diam quam nulla porttitor massa id. In vitae turpis massa sed elementum. Risus commodo viverra maecenas accumsan lacus vel. Hendrerit dolor magna eget est lorem ipsum. Integer eget aliquet nibh praesent tristique magna sit amet. Vulputate eu scelerisque felis imperdiet proin fermentum leo. Neque gravida in fermentum et. Dignissim diam quis enim lobortis scelerisque fermentum dui. <br/><br/>"
      input = ""
    }
  }

</script>

<div class="game-screen">
  <div class="game-text" bind:this={div}/>
  <div class="input-container">
    <span class="input-indicator">></span>
    <input class="user-input" placeholder="What do you do?" bind:value={input} on:keypress={handle_key_press}/>
  </div>
</div>

<style>
  .game-screen {
    font-family: "Lora", serif;
    height: 100%
  }

  .game-text {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .input-container {
    display: flex;
  }

  .input-indicator {
    margin-right: 0.2em;
  }

  .user-input {
    background: transparent;
    border: none;
    border-radius: 7px;
    font: italic 1em "Lora", serif;
    width: 97%;
  }

  .user-input:hover {
    outline: none;
    box-shadow: 0 0 5px rgb(70, 54, 30);
  }

  .user-input:focus {
    outline: none;
    border-color: transparent;
    box-shadow: none;
  }
</style>
