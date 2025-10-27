const addBtn = document.getElementById("addBtn");

const addBtnFunc = () => {
  const titleElement = document.getElementById("title");
  const contentElement = document.getElementById("content");
  const listElement = document.getElementById("posts");

  const title = titleElement.value;
  const content = contentElement.value;

  listElement.innerHTML = `<li><h2>${title}</h2><p>${content}</p></li>`;
};

addBtn.addEventListener("click", addBtnFunc);
