document.addEventListener("DOMContentLoaded", () => {
  const urlParas = new URLSearchParams(window.location.search);
  const topicId = urlParas.get("id");

  fetch(`http://localhost:3000/topics/${topicId}`)
    .then((response) => response.json())
    .then((topic) => {
      document.querySelector(".topic-title").textContent = topic.title;
      document.querySelector(".topic-description").textContent = topic.description;
      displayResources(topic.resources);
    });

  fetch(`http://localhost:3000/activities/topic/${topicId}`)
    .then((response) => response.json())
    .then((activities) => {
      displayActivities(activities);
    });

  function displayActivities(activities) {
    const activitiesList = document.querySelector(".activities ul");
    let hasActivities = false;

    while (activitiesList.firstChild) {
      activitiesList.removeChild(activitiesList.firstChild);
    }

    activities.forEach((activity) => {
      if (activity) {
        hasActivities = true;
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = activity.name;
        link.href = `activity.html?id=${activity._id}`;

        listItem.appendChild(link);
        activitiesList.appendChild(listItem);
      }
    });

    if (!hasActivities) {
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = "No activities available.";
      link.href = "#";

      link.style.pointerEvents = "none";

      listItem.appendChild(link);
      activitiesList.appendChild(listItem);
    }
  }

  function displayResources(resources) {
    const resourcesList = document.querySelector(".resources ul");

    // Remove existing list items
    while (resourcesList.firstChild) {
      resourcesList.removeChild(resourcesList.firstChild);
    }

    // Check if resources array exists and has items
    if (resources && resources.length > 0) {
      resources.forEach((resource) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = resource.name || resource.url;
        link.href = resource.url;

        listItem.appendChild(link);
        resourcesList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = "No resources available.";
      link.href = "#";
      link.style.pointerEvents = "none";

      listItem.appendChild(link);
      resourcesList.appendChild(listItem);
    }
  }
});
