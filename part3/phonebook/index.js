const express = require('express')

const app = express()
app.use(express.json())

let contacts = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: "1"
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: "2"
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: "3"
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: "4"
	}
]

const PORT = 3001

app.listen(PORT, ()=> {
	console.log(`Server running on port ${PORT}`)
})


app.get('/', (request, response) => {
	response.send('<div>Find a list of contacts in phonebook by using the api: ./api/persons</div>')
})

app.get('/api/persons', (request, response) => {
	response.json(contacts)
})

// app.get('/api/persons/:id', (request, response) => {
// 	const id = Number(request.params.id)
// 	const contact = contacts.find(note => note.id === id)
// 	if (contact) {
// 		response.json(contact)
// 	} else {
// 		response.status(404).end()
// 	}
// })

// app.post('/api/contacts', (request, response) => {
// 	const body = request.body

// 	if (!body.name || !body.number) {
// 		return response.status(400).json({
// 			error: 'incomplete entry: missing name or number'
// 		})
// 	}

// 	const generateId =  () => {
// 		const maxId = contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) : 0
// 		return maxId + 1
// 	}

// 	const contact = {
// 		name: body.name,
// 		number: body.number,
// 		id: generateId(),
// 					 content: body.content,
// 					 date: new Date(),
// 					 important: body.important || false}
				  
// 	notes = notes.concat(note)
// 	response.json(note)
// })

// app.delete('/api/notes/:id', (request, response) => {
// 	const id = Number(request.params.id)
// 	notes = notes.filter(note => note.id !== id)

// 	response.status(204).end()
// })
