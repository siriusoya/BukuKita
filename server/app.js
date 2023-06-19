require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler')
const router  = require('./routes/route')

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(router)

// console.log(process.env)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;