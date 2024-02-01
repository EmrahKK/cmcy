const os = require('os')
const express = require('express')
const dotenv = require('dotenv')
const moment = require('moment')
const app = express()
const port = 8080

app.use(express.json())
dotenv.config()

app.get('/', (req, res) => {
  res.json(getInfo());
})

app.post('/call', (req, res) => {
  console.log(req.body);
  res.send(req.body);
  req.body.receivedBy = identity
  req.body.receivedts = moment().format('MMMM Do YYYY, h:mm:ss a');
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
  console.log("rndInt: ",rndInt)
  if (rndInt!=3) {    
    setTimeout(() => {
      console.log("Delayed Call To ",callStack[rndInt]);
      console.log(msg);
    }, 5000);
  } 
}

const callStack = process.env.CALL_STACK.split(',');
const identity = process.env.IDENTITY;
console.log(callStack);
console.log(identity);

app.listen(port, () => {
  console.log(`Cmcy listening at http://localhost:${port}`)
})
