function find_valid_command(user_input: string[], target_array: string[]): string | null {
  for (const word of user_input) {
    if (target_array.includes(word)) {
      return word;
    }
  }
  return null;
}

function is_valid_command(user_input: string[], target_array: string[]) {
  for (const word of user_input) {
    if (target_array.includes(word)) {
      return true;
    }
  }
  return false;
}

export default Object.freeze({
  find_valid_command,
  is_valid_command
});
