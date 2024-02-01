const os = require('os')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 8080

app.use(express.json())
dotenv.config()

app.get('/', (req, res) => {
  res.json(getInfo());
})

app.get('/call', (req, res) => {
  console.log(request.body);
  res.send(request.body);
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
  setTimeout(() => {
    console.log("---Delayed Call---");
    console.log(msg);
    console.log("---");
  }, 10);
}


app.listen(port, () => {
  console.log(`Cmcy listening at http://localhost:${port}`)
})
