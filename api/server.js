const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb://127.0.0.1:27017";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  origin: "http://localhost:5500",
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, content-type",
};

// connect to mongodb
mongoose
  .connect(`${uri}/eLearningDB`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// USER
const User = require("../schemas/user");

/* Get All Users */
app.get("/users", cors(options), (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Get a User  */
app.get("/users/:id", cors(options), (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Update a User  */
app.put("/user/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Delete a User */
app.delete("/users/:id", cors(options), (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* TOPIC */
const Topic = require("../schemas/topic");

/* Get All Topics */
app.get("/topics", async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.send(topics);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* Create a Topic */
app.post("/topics", cors(options), (req, res) => {
  const newTopic = new Topic(req.body);
  newTopic
    .save()
    .then((topic) => {
      res.status(201).send(topic);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/* Get a Topic */
app.get("/topics/:id", cors(options), (req, res) => {
  Topic.findById(req.params.id)
    .then((topic) => {
      if (topic) {
        res.send(topic);
      } else {
        res.status(404).send("Topic not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Update a Topic  */
app.put("/topics/:id", cors(options), async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (topic) {
      res.send(topic);
    } else {
      res.status(404).send("Topic not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

/* Delete a Topic */
app.delete("/topics/:id", cors(options), (req, res) => {
  Topic.findByIdAndDelete(req.params.id)
    .then((topic) => {
      if (!topic) {
        res.status(404).send("Topic not found");
      }
      res.send(topic);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* ACTIVITY */
const Activity = require("../schemas/activity");

/* Create a Activity */
app.post("/activities", cors(options), (req, res) => {
  const newActivity = new Activity(req.body);
  newActivity
    .save()
    .then((activity) => {
      res.status(201).send(activity);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/* Get All Activities */
app.get("/activities", cors(options), (req, res) => {
  Activity.find({})
    .then((activities) => {
      res.send(activities);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* USER ACTIVITY */
const UserActivity = require("../schemas/userActivity");

/* Create a User Activity */

app.post("/userActivities", cors(options), (req, res) => {
  const newUserActivity = new UserActivity(req.body);
  newUserActivity
    .save()
    .then((userActivity) => {
      res.status(201).send(userActivity);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/* Get All User Activities */
app.get("/userActivities", cors(options), (req, res) => {
  UserActivity.find({})
    .then((userActivities) => {
      res.send(userActivities);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Get a User Activity */
app.get("/userActivities/:id", cors(options), (req, res) => {
  UserActivity.findById(req.params.id)
    .then((userActivity) => {
      if (userActivity) {
        res.send(userActivity);
      } else {
        res.status(404).send("User Activity not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
