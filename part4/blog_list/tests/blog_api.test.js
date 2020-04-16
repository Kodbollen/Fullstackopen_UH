const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
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
		expect(response.body).toHaveLength(helper.initialBlogs.length)
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
			title: 'Some blogs are okay',
			author: 'Abraham Lincoln',
			url: 'constitution.org',
			upvotes: 9999}

		const postRequest = await api.post('/api/blogs').send(blogObject)
		expect(postRequest.statusCode).toBe(200)
		expect(postRequest.type).toBe('application/json')

		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
		expect(response.body.map(blog => blog.title)).toContain('Some blogs are okay')
	})

	test('upvotes should default to zero if undefined ', async () => {
		const blogObject = {
			title: 'Some blogs are okay',
			author: 'Abraham Lincoln',
			url: 'constitution.org'
		}

		const postRequest = await api.post('/api/blogs').send(blogObject)
		expect(postRequest.statusCode).toBe(200)
		expect(postRequest.type).toBe('application/json')

		const response = await api.get('/api/blogs')
		expect(response.body.slice(-1)[0].upvotes).toBe(0)
	})

	test('Malformatted post request should return 400:bad request', async () => {
		const blogNoTitle = {
			author: 'Abraham Lincoln',
			url: 'constitution.org'
		}
		const blogNoAuthor = {
			title: 'Some blogs are okay',
			url: 'constitution.org'
		}

		const postNoTitle = await api.post('/api/blogs').send(blogNoTitle)
		expect(postNoTitle.statusCode).toBe(400)

		const postNoAuthor = await api.post('/api/blogs').send(blogNoAuthor)
		expect(postNoAuthor.statusCode).toBe(400)})
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

describe('Delete specific blog',  () => {
	test('Succeeds with status code 204 if id is valid', async () => {
		const blogsBefore = await helper.blogsInDb()
		const blogToDelete = blogsBefore[0]
		const result = await api.delete(`/api/blogs/${blogToDelete.id}`)
		expect(result.statusCode).toBe(204)

		const remaindingBlogs = await helper.blogsInDb()
		expect(remaindingBlogs).toHaveLength(blogsBefore.length - 1)

		const urls = remaindingBlogs.map(blog => blog.url)
		expect(urls).not.toContain(blogToDelete.url)
	})
})

describe('Update blog', () => {
	describe('Update title', () => {
		test('Update title should succeed', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: 'New Title!',
				author: blogs[0].author,
				url: blogs[0].url,
				upvotes: blogs[0].upvotes
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(200)
			expect(postRequest.type).toBe('application/json')
		})
		test('Update title should succeed only if no malformatted data', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: 'New Title!',
				author: '',
				url: blogs[0].url,
				upvotes: blogs[0].upvotes
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(400)
		})
	})
	describe('Update author', () => {
		test('Update author should succeed', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: blogs[0].title,
				author: 'Edsger W. Dijkstra',
				url: blogs[0].url,
				upvotes: blogs[0].upvotes
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(200)
			expect(postRequest.type).toBe('application/json')
		})
		test('Update author should succeed only if no malformatted data', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: blogs[0].title,
				author: 'Edsger W. Dijkstra',
				url: '',
				upvotes: blogs[0].upvotes
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(400)
		})
	})
	describe('Update upvotes', () => {
		test('Update upvotes should succeed', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: blogs[0].title,
				author: blogs[0].author,
				url: blogs[0].url,
				upvotes: 123
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(200)
			expect(postRequest.type).toBe('application/json')
		})
		test('Upvotes should update if not defined in new blog', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: blogs[0].title,
				author: blogs[0].author,
				url: blogs[0].url
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(200)
			expect(postRequest.type).toBe('application/json')
		})
		test('Update upvotes should succeed only if no malformatted data', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: '',
				author: blogs[0].author,
				url: blogs[0].url
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(400)
		})
	})
	describe('Update url', () => {
		test('Update url should succeed', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: blogs[0].title,
				author: blogs[0].author,
				url: blogs[0].url,
				upvotes: 123
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(200)
			expect(postRequest.type).toBe('application/json')
		})
		test('Update url should succeed only if unique', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: blogs[0].title,
				author: blogs[0].author,
				url: 'dinligegyldigemor.com',
				upvotes: 123
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(400)
		})
		test('Update url should succeed only if no malformatted data', async () => {
			const blogs = await helper.blogsInDb()
			const newObject = {
				title: blogs[0].title,
				author: '',
				url: 'dinligegyldigemor.com',
				upvotes: 123
			}
			const postRequest = await api.put(`/api/blogs/${blogs[0].id}`).send(newObject)
			expect(postRequest.statusCode).toBe(400)
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})
