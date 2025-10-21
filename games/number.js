let attempts = 1;
const numbers = [];

export const number = () => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  if (attempts > 3) {
    window.alert("Taah utga duussan bn!");

    return {
      isWin: false,
      game: "number",
      metadata: {
        numbers
      }
    };
  }

  const userNumber = window.prompt("Taah utgaa oruulna uu");

  numbers.push(userNumber);

  if (userNumber == randomNumber) {
    return {
      isWin: true,
      game: "number",
      metadata: {
        numbers
      }
    };
  } else {
    attempts++;
    number();
  }
};
