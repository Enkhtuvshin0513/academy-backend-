const addBtn = document.getElementById("addBtn");

const blogs = [];

const addBtnFunc = () => {
  const titleElement = document.getElementById("title");
  const contentElement = document.getElementById("content");
  const listElement = document.getElementById("posts");

  const title = titleElement.value;
  const content = contentElement.value;

  blogs.push({
    title,
    content
  });

  listElement.innerHTML = "";

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];

    const li = document.createElement("li");

    li.innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p>`;
    listElement.appendChild(li);
  }
};

addBtn.addEventListener("click", addBtnFunc);
