async function submitForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const body = document.getElementById("body").value;

  const data = { title, author, body }; 

  try {
    const response = await fetch("/api/blog-posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    // Get the new blog post from the response
    const newPost = await response.json();

    // Update the page with the new blog post
    const postList = document.getElementById("post-list");
    const newPostElement = createPostElement(newPost);
    postList.prepend(newPostElement);
    
    // Clear the form
    form.reset();

  } catch (error) {
    console.error(error);
  }
}

function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const titleElement = document.createElement("h2");
  titleElement.textContent = post.title;
  postElement.appendChild(titleElement);

  const authorElement = document.createElement("p");
  authorElement.textContent = "By " + post.author;
  postElement.appendChild(authorElement);

  const bodyElement = document.createElement("p");
  bodyElement.textContent = post.body;
  postElement.appendChild(bodyElement);

  return postElement;
}

const form = document.querySelector("form");
form.addEventListener("submit", submitForm);