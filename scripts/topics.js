document.addEventListener("DOMContentLoaded", () => {
  // Fetch Topics
  fetch("http://localhost:3000/topics")
    .then((response) => response.json())
    .then((topics) => {
      topics.forEach((topic) => displayTopic(topic));
    });

  function displayTopic(topic) {
    console.log(topic);
    const template = document.querySelector("#topic-template");
    const clone = template.content.cloneNode(true);
    const topicList = document.querySelector(".topic-list");
    const topicBtn = clone.querySelector(".topic-btn");

    clone.querySelector(".topic-title").textContent = topic.title;
    clone.querySelector(".topic-description").textContent = topic.description;

    topicBtn.addEventListener("click", () => {
      window.location.href = `http://localhost:3000/topics/${topic.id}`;
    });

    topicList.appendChild(clone);
  }
});
