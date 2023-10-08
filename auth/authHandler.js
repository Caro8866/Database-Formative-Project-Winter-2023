document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("auth-btn");
  const authBtnText = authBtn.querySelector(".tab-text");

  // Check if user is signed in (use your own logic here)
  const userIsSignedIn = localStorage.getItem("token") ? true : false;

  if (userIsSignedIn) {
    authBtn.href = "/sign-in.html"; // Change this to your sign-out URL
    authBtnText.textContent = "Sign out";
    authBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/sign-in.html";
    });
  } else {
    authBtn.href = "/sign-in.html"; // Change this to your sign-in URL
    authBtnText.textContent = "Sign in";
  }
});
