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

    clone.querySelector(".topic-title").textContent = topic.title;
    clone.querySelector(".topic-description").textContent = topic.description;

    clone.querySelector(".topic-link").addEventListener("click", () => {
      localStorage.setItem("topic", JSON.stringify(topic));
      window.location.href = "topic.html";
    });
    topicList.appendChild(clone);
  }
});
