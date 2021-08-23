const updateFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  // The form has 2 buttons, we figure out which one we clicked with the button const
  const button = document.activeElement.value;
  const title = document.querySelector("#title-box").value.trim();
  const content = document.querySelector("#content-box").value.trim();
  // We extract the ID of the current post through the current url, we use this ID to make the api call and figure out which post we are currently manipulating
  const postID = Number(
    window.location.href
      .split("/")
      ?.pop()
      .match(/(?<=post=)(.*)/)[0]
  );
  //   console.log(button, title, content, postID);

  // If we clicked on the update button, use the PUT api route to update the content
  if (button === "update") {
    if (content && title && postID) {
      const response = await fetch("/api/posts/", {
        method: "PUT",
        body: JSON.stringify({ title, content, postID }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard/");
      } else {
        alert("Failed to update the post.");
      }
    }
    // If we clicked on the delete button then call the DELETE api route to delete the current post
  } else if (button === "delete") {
    const response = await fetch("/api/posts/", {
      method: "DELETE",
      body: JSON.stringify({ postID }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert("Failed to update the post.");
    }
  }
};

// Listens to the comment form button
document
  .querySelector(".comment-form")
  .addEventListener("submit", updateFormHandler);
