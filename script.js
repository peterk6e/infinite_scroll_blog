const articles = document.getElementById("posts");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => displayPosts(json));

function displayPosts(array) {
  array.forEach((post) => {
    createPost(post);
  });
}

function createPost(postElement) {
  const post = document.createElement("div");
  post.innerHTML = `<div class="badge">${postElement.id}</div><div><strong>${postElement.title}</strong></div><p>${postElement.body}</p>`;
  post.className = "post";
  articles.appendChild(post);
}
