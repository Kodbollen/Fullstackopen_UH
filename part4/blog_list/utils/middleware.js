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
		return response.status(400).json({error: error.message })
	} else if (error.codeName === 'DuplicateKey') {
		return response.status(400).json({error: 'DuplicateKey'})
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({error: 'invalid token'})
	}

	logger.error(error.message)

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorisation = request.headers.authorization
	if (authorisation && authorisation.toLowerCase().startsWith('bearer ')) {
		request.token = authorisation.substring(7)
	}
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
}
