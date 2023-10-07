document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".sign-in-form");

  function signIn(email, password) {
    fetch("http://localhost:5500/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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

    const email = document.querySelector("#email").value;

    const password = document.querySelector("#password").value;

    signIn(email, password);
  });
});
