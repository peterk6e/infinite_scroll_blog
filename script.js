const postsContainer = document.getElementById("posts");
const loading = document.querySelector(".lds-ellipsis");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

async function displayPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    let newPost = createPost(post);
    postsContainer.appendChild(newPost);
  });
}

function createPost(postElement) {
  const post = document.createElement("div");

  post.innerHTML = `
    <div class="badge">${postElement.id}</div>
    <div><strong>${postElement.title}</strong></div>
    <p>${postElement.body}</p>
    `;
  post.title = postElement.title;
  post.body = postElement.body;
  post.className = "post";
  return post;
}

// Show loader & fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      displayPosts();
    }, 200);
  }, 500);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.title.toUpperCase();
    const body = post.body.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

// Show initial posts
displayPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
