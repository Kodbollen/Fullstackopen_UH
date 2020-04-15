const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch(error => {
		logger.error(`Error connecting to MongoDB:\n${error}`)
	})

app.use(cors())
app.use(express.json())

app.listen(config.PORT, () => {
	console.log(`Server running on port: ${config.PORT}`)
})

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
