const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors())
app.use(bodyParser.json())

const posts = [];

app.get('/posts', (req, res) => {
  res.send({
    posts
  });
})

app.post('/post', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const post = {
    id,
    title: req.body.title
  }
  posts.push(post)

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: post
  })

  res.status(201).send(post)
})

app.post('/events', (req, res) => {
  console.log('Event Recieved:', req.body.type);

  res.send('okay fucka')
})

app.listen(4000, () => {
  console.log('hash tag bizatchhhhh')
  console.log('posts file running woohoo')
})