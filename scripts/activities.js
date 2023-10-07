document.addEventListener("DOMContentLoaded", () => {
  const topicListDiv = document.querySelector(".topic-list");
  const template = document.getElementById("topic-template").content;
  let currentlyOpen = null;

  fetch("http://localhost:3000/topics")
    .then((response) => response.json())
    .then((topics) => {
      topics.forEach((topic) => {
        const clone = document.importNode(template, true);
        const topicTitle = clone.querySelector(".topic-title");
        const activityTableBody = clone.querySelector(".activity-table-body");

        topicTitle.textContent = topic.title;

        // Fetch activities for the topic
        fetch(`http://localhost:3000/activities/topic/${topic._id}`)
          .then((response) => response.json())
          .then((activities) => {
            activities.forEach((activity) => {
              const tr = document.createElement("tr");
              ["name", "type", "status", "_id"].forEach((key) => {
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
          });

        clone.querySelector(".topic-header").addEventListener("click", function (event) {
          event.preventDefault();
          const activitiesDiv = this.nextElementSibling;
          const spanText = this.querySelector("span");

          if (currentlyOpen && currentlyOpen !== activitiesDiv) {
            currentlyOpen.style.display = "none";
            currentlyOpen.previousElementSibling.querySelector("span").textContent = "Show activities";
          }

          if (activitiesDiv.style.display === "none" || activitiesDiv.style.display === "") {
            activitiesDiv.style.display = "block";
            spanText.textContent = "Hide activities";
            currentlyOpen = activitiesDiv;
          } else {
            activitiesDiv.style.display = "none";
            spanText.textContent = "Show activities";
            currentlyOpen = null;
          }
        });

        topicListDiv.appendChild(clone);
      });
    });
});
