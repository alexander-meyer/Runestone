<script lang="ts">
import dom_utils from "./util/dom";

  let text_window: HTMLElement;

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Duis ut diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Duis ut diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Duis ut diam quam nulla porttitor massa id.";

  function handle_key_press(event: KeyboardEvent) {
    if (event.key == "Enter") {
      dom_utils.append_text(lorem)
    }
  }

</script>

<div class="game-screen">
  <div id="game-text" bind:this={text_window}/>
  <div class="input-container">
    <span class="input-indicator">></span>
    <input id="user-input" placeholder="What do you do?" on:keypress={handle_key_press}/>
  </div>
</div>

<style>
  .game-screen {
    font-family: "Lora", serif;
    height: 100%
  }

  #game-text {
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

  #user-input {
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
