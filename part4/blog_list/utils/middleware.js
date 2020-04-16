const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info(`Method: ${request.method}`)
	logger.info(`Path: ${request.path}`)
	logger.info(`Body: ${request.body}`)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknownendpoint'})
}

const errorHandler = (error, request, response, next) => {
	logger.error(error)
	if (error.name === 'CastError' && error.message.includes('Cast to ObjectId')) {
		return response.status(400).json({error: 'Malformatted id'})
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}
