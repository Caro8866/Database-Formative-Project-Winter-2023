import { getUserData } from "../auth/authHandler.js";

document.addEventListener("DOMContentLoaded", async () => {
  // user progress
  // display topics
  // display activities in progress
  // Replace this with the actual user ID

  const userData = await getUserData();
  console.log(userData);

  displayActivities(userData.id);
  displayTopics(userData.id);
});

function displayActivities(userID) {
  fetch(`http://localhost:3000/userActivities/inProgress/${userID}`)
    .then((response) => response.json())
    .then((userActivities) => {
      const activityTableBody = document.querySelector(".activity-table-body");

      if (!userActivities.message) {
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
      } else {
        document.querySelector(".activity-table thead").remove();
        const tr = document.createElement("tr");
        const td = document.createElement("tr");
        td.textContent = userActivities.message;
        tr.appendChild(td);
        activityTableBody.appendChild(tr);
      }
    })
    .catch((error) => {
      console.error("Error fetching user activities:", error);
    });
}

function displayTopics(userID) {
  fetch("http://localhost:3000/topics")
    .then((response) => response.json())
    .then((topics) => {
      const topicList = document.querySelector(".topic-list");

      topics.forEach((topic) => {
        const li = document.createElement("li");
        li.textContent = topic.name;
        topicList.appendChild(li);
      });
    });
}
