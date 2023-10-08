document.addEventListener("DOMContentLoaded", async () => {
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
    const userData = await getUserData();
    showUser(userData);
  } else {
    authBtn.href = "/sign-in.html"; // Change this to your sign-in URL
    authBtnText.textContent = "Sign in";
  }
});

export async function getUserData() {
  const res = await fetch(`http://localhost:3000/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  });
  return await res.json();
}

function showUser(user) {
  document.querySelector("span.username") &&
    (document.querySelector("span.username").textContent = user.username);
}
