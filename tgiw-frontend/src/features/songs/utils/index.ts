export const getSongMoodMessage = (
  valence: number | undefined
): string | undefined => {
  if (!valence) return;

  if (valence <= 0.25) {
    return 'Sad 😓';
  } else if (valence > 0.25 && valence <= 0.5) {
    return 'Somewhat moody 🙁';
  } else if (valence > 0.5 && valence <= 0.75) {
    return 'Somewhat positive 🙂';
  } else {
    return 'Happy 😁';
  }
};

export const getGaugeColor = (
  featureValue: number | undefined
): string | undefined => {
  if (!featureValue) return;

  if (featureValue <= 33.33) {
    return '#FC8F68';
  } else if (featureValue > 33.33 && featureValue <= 66.66) {
    return '#FAC081';
  } else {
    return '#899CBC';
  }
};
