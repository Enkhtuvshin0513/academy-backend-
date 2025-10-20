//1 haich, 2 chuluu, 3 daawuu
let round = 0;
const resultArray = [];

const getRandomNumber = () => {
  return Math.floor(Math.random() * 3) + 1;
};

const logic = {
  1: 3,
  2: 1,
  3: 2
};

const getStringValue = value => {
  if (value === 1) {
    return "haich";
  } else if (value === 2) {
    return "chuluu";
  }

  return "daawuu";
};

const endGameAnswer = () => {
  const endGame = Number(
    window.prompt("Togloomiig zogsooh bol 0 urgejluuhel 1")
  );

  if (endGame !== 0) {
    return startGame();
  }

  return console.log(resultArray);
};

const printResult = (userValue, computerValue) => {
  const userStringValue = getStringValue(userValue);
  const computerStringValue = getStringValue(computerValue);

  resultArray[round] = {
    user: userStringValue,
    computer: computerStringValue,
    round
  };

  round++;

  return `user: ${userStringValue} computer: ${computerStringValue}`;
};

const starRockPaper = () => {
  const userValueString = window.prompt("1 haich, 2 chuluu, 3 daawuu");

  const userValueInt = Number(userValueString);

  const computerValue = getRandomNumber();

  if (userValueInt > 3 || userValueInt < 0) {
    window.alert("Aldaatai utga!");
    startGame();
  }

  if (logic[userValueInt] === computerValue) {
    window.alert("User yallaa!" + printResult(userValueInt, computerValue));
    endGameAnswer();
  } else if (logic[computerValue] === userValueInt) {
    window.alert("Computer yallaa!" + printResult(userValueInt, computerValue));
    endGameAnswer();
  } else {
    window.alert("Tenstlee" + printResult(userValueInt, computerValue));
    endGameAnswer();
  }
};

startGame();
