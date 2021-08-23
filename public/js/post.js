const postFormHandler = async (event) => {
  event.preventDefault();
  // Gets the comment content out of the box
  const comment = document.querySelector("#comment-box").value.trim();
  // Gets the post id from the url
  const postID = window.location.href.split("/")?.pop();
  if (comment && postID) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ comment, postID }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to post comment.");
    }
  }
};

// Listens to the comment form button
document
  .querySelector(".comment-form")
  .addEventListener("submit", postFormHandler);
