const dotenv = require('dotenv')
const express = require('express')
const search_router = require('./routes/search_clips')


const app = express()

// Load config
dotenv.config({path: './config/config.env'})

const PORT = process.env.PORT || 8500

app.listen(
      PORT, 
      console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
)

app.use('/', search_router)

// const http = require('http')
// const { appendFile } = require('fs')
// const http_server = http.createServer((req, res) => {
//       res.bod
// })