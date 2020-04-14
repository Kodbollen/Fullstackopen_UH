require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('build'))
morgan.token('contact', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms data :contact'))
app.use(cors())


const PORT = process.env.PORT

app.listen(PORT, ()=> {
	console.log(`Server running on port ${PORT}`)
})


app.get('/info', (request, response) => {
	Person.find({}).count()
		.then(result => {
			response.send(`<p>Phonebook has ${result} contacts</p><p> ${new Date()}</p>`)
		})
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(contacts => {
		response.json(contacts.map(contact => contact.toJSON()))
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(contact => {
			if (contact) {
				response.json(contact.toJSON())
			} else {
				response.status(404)
			}
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({error: 'Cannot create contact with no name'})
	}

	if (!body.number) {
		return response.status(400).json({error: 'Cannot create contact with no number'})
	}

	// console.log(contacts.map(contact => contact.name))
	// if (contacts.map(contact => contact.name).includes(body.name)){
	// 	return response.status(400).json({error: `Cannot create contact. ${body.name} already exists in phonebook`})
	// }

	const contact = new Person({
		name: body.name,
		number: body.number
	})

	contact.save()
		.then(savedContact => savedContact.toJSON())
		.then(savedFormatted => response.json(savedFormatted))
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({error: 'Cannot modify contact with no name'})
	}

	if (!body.number) {
		return response.status(400).json({error: 'Cannot modify contact with no number'})
	}

	const contact = {
		name: body.name,
		number: body.number
	}
	console.log(request.params.id)

	Person.findByIdAndUpdate(request.params.id, contact, {new: true})
		.then(updatedContact => updatedContact.toJSON())
		.then(updatedFormatted => response.json(updatedFormatted))
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).json({error: 'malformatted id'})
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({error: error.message})
	}

	next(error)
}

app.use(errorHandler)
