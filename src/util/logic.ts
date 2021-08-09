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

function is_subset(user_input: string[], target_array: string[]) {
  for (const word of user_input) {
    if (!target_array.includes(word)) {
      return false;
    }
  }
  return true;
}

function arrays_are_equal(user_input: string[], target_array: string[]) {
  return is_subset(user_input, target_array) && is_subset(target_array, user_input);
}

export default Object.freeze({
  find_valid_command,
  is_valid_command,
  is_subset,
  arrays_are_equal
});
