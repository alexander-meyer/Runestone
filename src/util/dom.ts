function append_text(text: string) {
  const text_window = document.getElementById("game-text");
  const input_element = <HTMLInputElement>document.getElementById("user-input");

  text_window.innerHTML += "> <i>" + input_element.value + "</i><br/><br/>" + text + "<br/> <br/>";
  input_element.value = "";

  if (text_window.scrollHeight > text_window.offsetHeight) {
    text_window.scrollTo({
      top: text_window.scrollHeight,
      left: 0,
      behavior: "smooth"
    });
  }
}

export default Object.freeze({
  append_text
});
