export function generatePassword() {
  let password = "";
  for (let i = 0; i < 12; i++) {
    let choice = random(0, 3);
    if (choice === 0) {
      password += randomLower();
    } else if (choice === 1) {
      password += randomUpper();
    } else if (choice === 2) {
      password += randomSymbol();
    } else if (choice === 3) {
      password += random(0, 9);
    } else {
      i--;
    }
  }
  setPassword(password);
}

const random = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomLower = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[random(0, letters.length - 1)];
};

const randomUpper = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[random(0, letters.length - 1)];
};

const randomSymbol = () => {
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  return symbols[random(0, symbols.length - 1)];
};
