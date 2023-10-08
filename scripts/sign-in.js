document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".sign-in-form");

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  function signIn(email, password) {
    fetch("http://localhost:3000/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            console.log("Login failed, server responded with:", errorData);
            throw new Error("Login failed");
          });
        }
      })
      .then((data) => {
        window.location.href = "/index.html";
        localStorage.setItem("token", data.token);
      })
      .catch((error) => {
        console.error("There was a problem signing in:", error);
      });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    signIn(email, password);

    // Reset the form
    form.reset();
  });
});
