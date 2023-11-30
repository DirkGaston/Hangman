const words: string[] = [
  "COMPUTER",
  "AVOCADO",
  "PAPAYA",
  "VEHICLE",
  "ANIMAL",
  "VETERINARY",
  "MOBILE",
  "TELEPHONE",
];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
