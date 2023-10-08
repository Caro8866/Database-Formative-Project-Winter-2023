const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb://127.0.0.1:27017";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  origin: [
    "http://localhost:5500",
    "http://localhost:5500/sign-up.html",
    "http://localhost:5500/sign-in.html",
    "http://localhost:5500/topics.html",
    "http://localhost:5500/activities.html",
    "http://localhost:5500/progress.html",
  ],
  optionsSuccessStatus: 200,
  methods: ["GET, POST, PUT, DELETE"],
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

app.post("/auth/signIn", cors(options), (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log("Email not found");
        return res.status(401).json({ message: "Invalid login" });
      }

      return user.isValidPassword(req.body.password).then((isValid) => {
        if (isValid) {
          const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
          return res.status(200).json({ token });
        } else {
          console.log("Password does not match");
          return res.status(401).json({ message: "Invalid login" });
        }
      });
    })
    .catch((error) => {
      console.log("Server error:", error);
      res.status(401).json({ message: "Invalid login", error });
    });
});

app.post("/auth/verify", cors(options), (req, res) => {
  const verification = jwt.verify(req.body.token, process.env.jwt_secret);
  if (verification._id.length) {
    User.findOne({ _id: new mongoose.Types.ObjectId(verification._id) }).then(
      (user) => {
        // console.log(user.username, user.email);
        if (user) {
          return res.status(200).json({
            username: user.username,
            email: user.email,
            id: new mongoose.Types.ObjectId(user._id),
          });
        } else {
          return res.status(400).json({ message: "No user found" });
        }
      }
    );
  }
});

/// User Sign Up endpoint
app.post("/auth/signUp", cors(options), (req, res) => {
  const { username, email, password } = req.body;

  bcrypt
    .hash(password, 10) // Hash the password
    .then((hashedPassword) => {
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      return newUser.save(); // Save the user to database
    })
    .then((savedUser) => {
      const token = jwt.sign({ _id: savedUser._id }, process.env.jwt_secret);
      res.status(200).json({ token });
    })
    .catch((error) => {
      res.status(400).json({ message: "Sign-up failed", error });
    });
});

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
app.put("/users/:id", cors(options), (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      res.status(500).json({ error: "Error updating user", err });
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
  const resources = JSON.parse(req.body.resources || "[]");
  const newTopic = new Topic({
    title: req.body.title,
    description: req.body.description,
    resources: resources,
  });
  newTopic
    .save()
    .then((topic) => {
      const resID = new mongoose.Types.ObjectId(res.insertedId);
      console.log(resID);
      res.status(201).json({ insertedID: resID });
    })
    .catch((err) => console.error("Error Saving Topic:", err));
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
  Topic.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  )
    .then((topic) => {
      res.status(200).json(topic);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error updating topic", err });
    });
});

/* Delete a Topic */
app.delete("/topics/:id", cors(options), (req, res) => {
  Topic.findByIdAndDelete(req.params.id)
    .then((topic) => res.status(200).json(topic))
    .catch((err) => {
      res.status(500).send({ error: "Error Deleting Topic:", err });
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

/* Get a Activity */
app.get("/activities/:id", cors(options), (req, res) => {
  Activity.findById(req.params.id)
    .then((activity) => {
      if (activity) {
        res.send(activity);
      } else {
        res.status(404).send("Activity not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Get Activities by Topic */
app.get("/activities/topic/:id", cors(options), (req, res) => {
  const id = req.params.id;
  Activity.find({ topicID: id })
    .then((activities) => {
      res.send(activities);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Update a Activity  */
app.put("/activities/:id", cors(options), (req, res) => {
  Activity.findByIdAndUpdate(
    req.params.id,
    {
      topicID: req.body.topicID,
      name: req.body.name,
      type: req.body.type,
      content: req.body.content,
    },
    { new: true }
  )
    .then((activity) => {
      res.status(200).json(activity);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error updating activity", err });
    });
});

/* Delete a Activity */
app.delete("/activities/:id", cors(options), (req, res) => {
  Activity.findByIdAndDelete(req.params.id)
    .then((activity) => res.status(200).json(activity))
    .catch((err) => {
      res.status(500).send({ error: "Error Deleting Activity:", err });
    });
});

/* USER ACTIVITY */
const UserActivity = require("../schemas/userActivity");

/* Create a User Activity */
app.post("/userActivities", cors(options), (req, res) => {
  const newUserActivity = new UserActivity({
    userID: req.body.userID,
    activityID: req.body.activityID,
    _id: req.body.userID + "-" + req.body.activityID,
    status: req.body.status,
    score: req.body.score,
    completedTimestamp: req.body.completedTimestamp,
  });

  newUserActivity
    .save()
    .then((userActivity) => {
      res.status(201).send(userActivity);
    })
    .catch((err) => {
      console.log("Error: ", err);
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

/* Get a Users in progress activities */
app.get("/userActivities/inProgress/:id", cors(options), (req, res) => {
  UserActivity.find({ userID: req.params.id, status: "inProgress" })
    .then((userActivities) => {
      if (userActivities.length > 0) {
        res.send(userActivities);
      } else {
        res
          .status(404)
          .json({ message: "No activities in progress found for the user." });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* Update a User Activity  */
app.put("/userActivities/:id", cors(options), (req, res) => {
  UserActivity.findByIdAndUpdate(
    req.params.id,
    {
      userID: req.body.userID,
      activityID: req.body.activityID,
      status: req.body.status,
      score: req.body.score,
      completedTimestamp: req.body.completedTimestamp,
    },
    { new: true }
  )
    .then((userActivity) => {
      res.status(200).json(userActivity);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error updating user activity", err });
    });
});

/* Delete a User Activity */
app.delete("/userActivities/:id", cors(options), (req, res) => {
  UserActivity.findByIdAndDelete(req.params.id)
    .then((userActivity) => res.status(200).json(userActivity))
    .catch((err) => {
      res.status(500).send({ error: "Error Deleting User Activity:", err });
    });
});
