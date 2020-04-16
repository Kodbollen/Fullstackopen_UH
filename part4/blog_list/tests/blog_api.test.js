const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
	const response = await api.get('/api/blogs')
	expect(response.statusCode).toBe(200)
	expect(response.type).toBe('application/json')
})

test('There are three notes', async() => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(3)
})

test('First blog have correct title', async() => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].title).toBe('Blogs are shit')
})

afterAll(() => {
	mongoose.connection.close()
})
