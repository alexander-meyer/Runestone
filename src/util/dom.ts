function append_text(text: string, include_user_input = true) {
  const text_window = document.getElementById("game-text");
  const input_element = <HTMLInputElement>document.getElementById("user-input");

  const input = (
    include_user_input == true
    ? "> <i>" + input_element.value + "</i><br/><br/>"
    : ""
  );

  text_window.innerHTML += input + text + "<br/> <br/>";
  input_element.value = "";

  if (text_window.scrollHeight > text_window.offsetHeight) {
    text_window.scrollTo({
      top: text_window.scrollHeight,
      left: 0,
      behavior: "smooth"
    });
  }
}

function help_message() {
  const help_message_html = `This is a petite adventure where you traverse different areas to discover secrets and solve puzzles. Some of the basic commands are:
    <ul>
    <li><b>go</b> _____ : move between rooms</li>
    <li><b>examine</b> _____ : investigate a particular object</li>
    <li><b>bag</b> : check the contents of your inventory</li>
    <li><b>where am I</b> : information about your current location</li>
    </ul>
    Areas may also contain hidden triggers that respond to additional prompts. Type <i>help</i> at any time to bring up this info. <br/><br/>
  `;

  append_text(help_message_html);
}

export default Object.freeze({
  append_text,
  help_message
});
