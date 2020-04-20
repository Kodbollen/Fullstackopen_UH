const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('Test with one user in DB initially', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('goodpassword', 10)
		const user = new User({username: 'root', name: "Super User", passwordHash})

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'bulooguloo',
			name: 'Edsger',
			password: 'alsogoodpassword',
		}

		const result = await api.post('/api/users').send(newUser)
		expect(result.statusCode).toBe(200)
		expect(result.type).toBe('application/json')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'badpw123',
		}

		const result = await api.post('/api/users').send(newUser)
		expect(result.statusCode).toBe(400)
		expect(result.type).toBe('application/json')
		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	test('creation fails with proper statuscode and message if username is invalid', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ts',
			name: 'Superuser',
			password: 'badpw123',
		}

		const result = await api.post('/api/users').send(newUser)
		expect(result.statusCode).toBe(400)
		expect(result.type).toBe('application/json')
		expect(result.body.error.toLowerCase()).toBe('username must be at least 3 characters long')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	test('creation fails with proper statuscode and message if username is invalid', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'notTooShort',
			name: 'Superuser',
			password: 'a1',
		}

		const result = await api.post('/api/users').send(newUser)
		expect(result.statusCode).toBe(400)
		expect(result.type).toBe('application/json')
		expect(result.body.error.toLowerCase()).toBe('password must be at least 3 characters long')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

})
