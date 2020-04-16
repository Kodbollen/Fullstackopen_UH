const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
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

	const blogObjects = initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})
describe('GET of all blogs', () => {
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
})

describe('POST of new blog', () => {
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

	test('upvotes should default to zero if undefined ', async () => {
		const blogObject = {
			title: "Some blogs are okay",
			author: "Abraham Lincoln",
			url:"constitution.org"
		}

		const postRequest = await api.post('/api/blogs').send(blogObject)
		expect(postRequest.statusCode).toBe(200)
		expect(postRequest.type).toBe('application/json')

		const response = await api.get('/api/blogs')
		expect(response.body.slice(-1)[0].upvotes).toBe(0)
	})

	test('Malformatted post request should return 400:bad request', async () => {
		const blogNoTitle = {
			author: "Abraham Lincoln",
			url:"constitution.org"
		}
		const blogNoAuthor = {
			title: "Some blogs are okay",
			url:"constitution.org"
		}

		const postNoTitle = await api.post('/api/blogs').send(blogNoTitle)
		expect(postNoTitle.statusCode).toBe(400)

		const postNoAuthor = await api.post('/api/blogs').send(blogNoAuthor)
		expect(postNoAuthor.statusCode).toBe(400)
	})
})

describe('GET of specific blog', () => {
	test('Succeeds with valid id', async () => {
		const blogs = await Blog.find({})
		const blog = blogs[0]

		const resultBlog = await api.get(`/api/blogs/${blog.id}`)
		expect(resultBlog.statusCode).toBe(200)
		expect(resultBlog.type).toBe('application/json')
	})
	test('Fails with 404 if blog does not exist', async () => {
		const validNonExistingId = await helper.nonExistingId()
		const resultBlog = await api.get(`/api/blogs/${validNonExistingId}`)
		expect(resultBlog.statusCode).toBe(404)
	})
	test('Fails with 400 if id is invalid', async () => {
		const invalidId = '768dsfg7896fdgs6sgdf'

		const resultBlog = await api.get(`/api/blogs/${invalidId}`)
		expect(resultBlog.statusCode).toBe(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
