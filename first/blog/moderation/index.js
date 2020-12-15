const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  const comment = req.body;

  if (comment.type === 'CommentCreated') {
    const hasOrange = comment.data.content.includes('orange');

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: comment.data.id,
        content: comment.data.content,
        postId: comment.data.postId,
        status: hasOrange ? "rejected" : "approved"
      }
    })

    res.send({})
  }
})

app.listen(4003, () => {
  console.log('Listening on 4003')
})