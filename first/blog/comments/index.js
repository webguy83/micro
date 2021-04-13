const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsById = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsById[req.params.id] || []);
});

app.post('/posts/:id/comment', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const postId = req.params.id;
  const comments = commentsById[postId] || [];
  const comment = {
    id: commentId,
    content: req.body.content,
    status: 'pending',
  };

  comments.push(comment);

  commentsById[postId] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: { ...comment, postId },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { id, content, postId, status } = data;
    const comments = commentsById[postId];
    const comment = comments.find((c) => (c.id = id));
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  res.send('OK');
});

app.listen(4001, () => {
  console.log('4001 !!!! y sdasda');
});
