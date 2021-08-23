const signupFormHandler = async (event) => {
    event.preventDefault();
    // Get the user and password out of the corresponding boxes
    const username = document.querySelector("#username-input").value.trim();
    const password = document.querySelector("#password-input").value.trim();
    // If the anything was inputted in the user and password boxes, try to sign up
    if (username && password) {
      const response = await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard/");
      } else {
        alert("Failed to sign up new user.");
      }
    }
  };
  
  // Creates the signup form button
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
  