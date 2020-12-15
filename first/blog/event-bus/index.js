const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const evt = req.body;

  events.push(evt);

  axios.post('http://localhost:4000/events', evt);
  axios.post('http://localhost:4001/events', evt);
  axios.post('http://localhost:4002/events', evt);
  axios.post('http://localhost:4003/events', evt);

  res.send({ status: 'OK' })
});

app.get('/events', (req, res) => {
  res.send(events);
})

app.listen(4005, () => {
  console.log('listening on 4005 woohoo')
})