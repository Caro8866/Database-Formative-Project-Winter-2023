document.addEventListener("DOMContentLoaded", () => {
  // user progress
  // display topics
  // display activities in progress
  const userID = "some_user_id"; // Replace this with the actual user ID

  fetch(`http://localhost:3000/userActivities/inProgress/${userID}`)
    .then((response) => response.json())
    .then((userActivities) => {
      const activityTableBody = document.querySelector(".activity-table-body");

      userActivities.forEach((activity) => {
        const tr = document.createElement("tr");

        ["name", "type", "_id"].forEach((key) => {
          const td = document.createElement("td");
          td.textContent = activity[key];

          if (key === "_id") {
            const a = document.createElement("a");
            a.href = `activity.html?id=${activity[key]}`;
            a.textContent = "View Activity";
            td.textContent = "";
            td.appendChild(a);
          }

          tr.appendChild(td);
        });

        activityTableBody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error fetching user activities:", error);
    });
});
