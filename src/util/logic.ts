function find_valid_command(user_input: string[], target_array: string[]): string | null {
  for (const word of user_input) {
    if (target_array.includes(word)) {
      return word;
    }
  }
  return null;
}

/**
 * Test whether one array is a subset of another.
 *
 * @param subject_array The array being tested for subset property.
 * @param target_array Target array, i.e. testing whether `subject_array` is a
 *   subset of `target_array`.
 *
 * @returns True if `subject_array` is a subset of `target_array`, else false.
 */
function is_subset(subject_array: string[], target_array: string[]) {
  for (const word of subject_array) {
    if (!target_array.includes(word)) {
      return false;
    }
  }
  return true;
}

/**
 * Test if two arrays are equal by ensuring that each is a subset of the other.
 *
 * @param user_input The user input array.
 * @param target_array Array to check for equality with `user_input`.
 *
 * @returns True if the two arrays are equal, otherwise false.
 */
function arrays_are_equal(user_input: string[], target_array: string[]) {
  return is_subset(user_input, target_array) && is_subset(target_array, user_input);
}

/**
 * Check if two arrays overlap.
 *
 * Used to determine if the user types in a keyword (e.g. an item in the
 * inventory) but their input fails to trigger any specifc response; in this
 * scenario, we can prompt the user to be more specific / try another request
 * with the aforementioned keyword.
 *
 * @param user_input The user input array.
 * @param target_array The array to check for any overlapping elements with
 *   `user_input`.
 *
 * @returns Returns the first string in `target_array` that is present in
 *   `user_input`. If there are none, it returns null.
 */
function has_overlap(user_input: string[], target_array: string[]): string | null {
  for (const element of target_array) {
    if (user_input.includes(element.toLocaleLowerCase())) {
      return element;
    }
  };
  return null;
}

export default Object.freeze({
  find_valid_command,
  is_subset,
  arrays_are_equal,
  has_overlap
});
