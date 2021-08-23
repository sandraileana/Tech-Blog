const createFormHandler = async (event) => {
    event.preventDefault();

    // Get title and content from its respective boxes and makes a POST api call
    const title = document.querySelector("#title-box").value.trim();
    const content = document.querySelector("#content-box").value.trim();
    const userID = window.location.href.split("/")?.pop();
    if (content && title) {
      const response = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify({ title, content, userID }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard/")
      } else {
        alert("Failed to create a new post.");
      }
    }
  };
  
  // Listens to the comment form button
  document
    .querySelector(".comment-form")
    .addEventListener("submit", createFormHandler);
  