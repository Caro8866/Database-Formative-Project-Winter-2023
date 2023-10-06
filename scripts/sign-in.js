document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".sign-in-form");

  function signIn(usernameOrEmail, password) {
    fetch("/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          console.log("Login failed");
          return Promise.reject("Login failed");
        }
      })
      .then((data) => {
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("There was a problem signing in:", error);
      });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameOrEmail = document.getElementById("usernameOrEmail").value;
    const password = document.getElementById("password").value;

    signIn(usernameOrEmail, password);
  });
});
