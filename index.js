let counter = true;

const h1 = document.getElementById("span");

const plusButton = document.getElementById("plus");
const minButton = document.getElementById("min");

const plus = () => {
  counter++;

  h1.innerText = counter;
};
const min = () => {
  counter--;

  h1.innerText = counter;
};

plusButton.addEventListener("click", plus);
minButton.addEventListener("click", min);
