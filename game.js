import { rockpaper } from "./rockpaper.js";

const games = {
  rockpaper,
  word: () => {
    console.log("Word chuluu daawuu togloh gj bn");
  },
  dice: () => {
    console.log("Dice chuluu daawuu togloh gj bn");
  },
  number: () => {
    console.log("Number chuluu daawuu togloh gj bn");
  }
};

const game = window.prompt("Ymar togloom togloh we");

games[game]();
