const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = [];

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts.push({
      id,
      title,
      comments: [],
    });
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.comments.push({
        id,
        content,
        status,
      });
    }
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts.find((p) => p.id === postId);
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvents(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening of 4002");

  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    console.log("processing event:", event.type);

    handleEvents(event.type, event.data);
  }
});
