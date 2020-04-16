const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: "Blogs are bad",
		author: "Anders",
		url: "dinmor.com",
		upvotes: 123,
		id: "5e96ed64386aab14578c5bd8"
	},
	{
		title: "Blogs are still bad",
		author: "Anders",
		url: "dinstadigemor.com",
		upvotes: 1234,
		id: "5e96fb2fa109141a915a6047"
	},
	{
		title: "Blogs are unnecessary",
		author: "Anders",
		url: "dinligegyldigemor.com",
		upvotes: 12345,
		id: "5e9839ebd664500ec33f55f3"
	}]

beforeEach(async () => {
	await Blog.deleteMany({})

	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
	blogObject = new Blog(initialBlogs[2])
	await blogObject.save()
})

test('blogs are returned as json', async () => {
	const response = await api.get('/api/blogs')
	expect(response.statusCode).toBe(200)
	expect(response.type).toBe('application/json')
})

test('All blogs are returned', async() => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('Specific blog is within returned blogs', async() => {
	const response = await api.get('/api/blogs')
	expect(response.body.map(content => content.title)).toContain('Blogs are bad')
})

test('Id is properly defined', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('Valid blog can be posted', async () => {
	const blogObject = {
		title: "Some blogs are okay",
		author: "Abraham Lincoln",
		url:"constitution.org",
		upvotes: 9999}

	const postRequest = await api.post('/api/blogs').send(blogObject)
	expect(postRequest.statusCode).toBe(200)
	expect(postRequest.type).toBe('application/json')

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length + 1)
	expect(response.body.map(blog => blog.title)).toContain('Some blogs are okay')
})

afterAll(() => {
	mongoose.connection.close()
})
