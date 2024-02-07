const os = require('os')
const express = require('express')
const dotenv = require('dotenv')
const moment = require('moment')
const axios = require('axios')
const app = express()
const port = 8080

app.use(express.json())
dotenv.config()

app.get('/', (req, res) => {
  res.json(getInfo());
})

app.post('/call', (req, res) => {
  res.send(req.body);
  req.body[req.body.length - 1].receivedBy = identity;
  req.body[req.body.length - 1].receivedts = moment().format('MMMM Do YYYY, h:mm:ss a');
  delayedCall(req.body);
})

// 
app.get('/kill', (req, res) => {
  console.log("Killing server");
  process.exit(1);
})

// Utility functions
const getInfo = () => {
  return {
    uptime: os.uptime(),
    type: os.type(),
    release: os.release(),
    hostname: os.hostname(),
    arch: os.arch(),
    platform: os.platform(),
    env: process.env
  };
}

const delayedCall = (msg) => {
  const rndInt = Math.floor(Math.random() * 3) + 1
  if (rndInt!=3) {    
    setTimeout(() => {      
      let newMsg = {};
      newMsg.message = 'message from '+identity
      newMsg.sendts = moment().format('MMMM Do YYYY, h:mm:ss a');
      msg.push(newMsg);
      console.log("Delayed Call To ",callStack[rndInt]);
      console.log(msg);
      axios.post('http://'+callStack[rndInt]+'/call', msg);
    }, 5000);
  } 
}

const callStack = process.env.CALL_STACK.split(',');
const identity = process.env.IDENTITY;
console.log(identity);
console.log(callStack);

app.listen(port, () => {
  console.log(identity+' listening')
})
