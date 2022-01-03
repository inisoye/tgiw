export const getSongMoodMessage = (
  valence: number | undefined
): string | undefined => {
  if (!valence) return;

  if (valence <= 0.25) {
    return 'Very sad 😓';
  } else if (valence > 0.25 && valence <= 0.5) {
    return 'Somewhat moody 🙁';
  } else if (valence > 0.5 && valence <= 0.75) {
    return 'Somewhat positive 🙂';
  } else {
    return 'Very happy 😁';
  }
};
