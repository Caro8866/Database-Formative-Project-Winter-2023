document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".sign-up-form");

  function signUp(username, email, password) {
    fetch("http://localhost:3000/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("Sign-up failed", response);
        }
      })
      .then((data) => {
        // Redirect or do something with the returned data
        console.log("Sign-up successful:", data);
        window.location.href = "/index.html";
      })
      .catch((error) => {
        // Handle any errors
        console.error("There was a problem signing up:", error);
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    signUp(username, email, password);
  });
});
