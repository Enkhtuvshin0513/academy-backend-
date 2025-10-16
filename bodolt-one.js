let playAgain = 1;

const getRandomNumber = () => {
  return Math.floor(Math.random() * 3) + 1;
};

const getStringValue = value => {
  if (value === 1) {
    return "haich";
  } else if (value === 2) {
    return "chuluu";
  }

  return "daawuu";
};

const printResult = (userValue, computerValue) => {
  const userStringValue = getStringValue(userValue);
  const computerStringValue = getStringValue(computerValue);

  return `user: ${userStringValue} computer: ${computerStringValue}`;
};

const endGameAnswer = () => {
  const endGame = Number(
    window.prompt("Togloomiig zogsooh bol 0 urgejluuhel 1")
  );

  if (endGame !== 0) {
    startGame();
  }
};

const startGame = () => {
  const userValueString = window.prompt("1 haich, 2 chuluu, 3 daawuu");

  const userValueInt = Number(userValueString);

  const computerValue = getRandomNumber();

  if (userValueInt === computerValue) {
    window.alert("Tentslee!", printResult(userValueInt, computerValue));

    endGameAnswer();
  } else if (userValueInt === 1 && computerValue === 3) {
    window.alert("User yallaa!" + printResult(userValueInt, computerValue));
    endGameAnswer();
  } else if (userValueInt === 2 && computerValue === 1) {
    window.alert("User yallaa!" + printResult(userValueInt, computerValue));
    endGameAnswer();
  } else if (userValueInt === 3 && computerValue === 2) {
    window.alert("User yallaa!" + printResult(userValueInt, computerValue));
    endGameAnswer();
  } else {
    window.alert("Computer yallaa!" + printResult(userValueInt, computerValue));
    endGameAnswer();
  }
};

startGame();
