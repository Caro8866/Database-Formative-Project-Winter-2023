document.addEventListener("DOMContentLoaded", () => {
  const urlParas = new URLSearchParams(window.location.search);
  const topicId = urlParas.get("id");

  fetch(`http://localhost:3000/activities/topic/${topicId}`)
    .then((response) => response.json())
    .then((activities) => {
      displayActivities(activities);
    });

  function displayActivities(activities) {
    const activitiesList = document.querySelector(".activities ul");

    // Remove any existing list items
    while (activitiesList.firstChild) {
      activitiesList.removeChild(activitiesList.firstChild);
    }

    activities.forEach((activity) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = activity.name;
      link.href = `activity.html?id=${activity._id}`; // Create a link to the activity's dedicated page, if you have one

      listItem.appendChild(link);
      activitiesList.appendChild(listItem);
    });
  }
});
