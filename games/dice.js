export const dice = () => {
  const shoo1 = Math.floor(Math.random() * 6) + 1;
  const shoo2 = Math.floor(Math.random() * 6) + 1;

  const sum = shoo1 + shoo2;

  if (sum === 7 || sum === 11) {
    return {
      isWin: true,
      name: "dice",
      metadata: {
        shoo1,
        shoo2
      }
    };
  } else {
    return {
      isWin: false,
      name: "dice",
      metadata: {
        shoo1,
        shoo2
      }
    };
  }
};
