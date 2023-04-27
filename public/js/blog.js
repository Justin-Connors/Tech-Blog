async function submitForm(event) {
    event.preventDefault(); 
  
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
    } catch (error) {
      console.error(error);
    }
  }
  
  const form = document.querySelector("form");
  form.addEventListener("submit", submitForm);
  