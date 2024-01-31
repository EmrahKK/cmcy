const os = require('os')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const port = 8080

var morgan = require('morgan')
app.use(morgan('combined'))

dotenv.config()

app.get('/', (req, res) => {
  res.json(getInfo());
})

app.get('/call', (req, res) => {
  res.json(getInfo());
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
    
  }, 60);
}


app.listen(port, () => {
  console.log(`Cmcy listening at http://localhost:${port}`)
})
