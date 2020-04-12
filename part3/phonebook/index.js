const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
morgan.token('contact', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms data :contact'))

let contacts = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: 1
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: 3
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: 4
	}
]

const PORT = 3001

app.listen(PORT, ()=> {
	console.log(`Server running on port ${PORT}`)
})


app.get('/', (request, response) => {
	response.send('<div><p>Find a list of contacts in phonebook by using the api:</p><p>contacts: ./api/persons</p><p>info: ./info</p></div>')
})

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has ${contacts.length} contacts</p><p> ${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
	response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const contact = contacts.find(contact => contact.id === id)
	if (contact) {
		response.json(contact)
	} else {
		response.status(404).end()
	}
})

app.post('/api/persons', (request, response) => {
	const body = request.body
	console.log(body)
	console.log(body.name)
	console.log(typeof(body.name))
	console.log(contacts[0].name)
	console.log(typeof(contacts[0].name))
	console.log(body.number)
	const generateId = () => {
		return Math.round(Math.random() * 10000)
	}

	if (!body.name) {
		return response.status(400).json({error: 'Cannot create contact with no name'})
	}

	if (!body.number) {
		return response.status(400).json({error: 'Cannot create contact with no number'})
	}

	console.log(contacts.map(contact => contact.name))
	if (contacts.map(contact => contact.name).includes(body.name)){
		return response.status(400).json({error: `Cannot create contact. ${body.name} already exists in phonebook`})
	} 

	const contact = {
		name: body.name,
		number: body.number,
		id: generateId()
	}
	
	contacts = contacts.concat(contact)
	response.json(contact)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	contacts = contacts.filter(contact => contact.id !== id)

	response.status(204).end()
})
