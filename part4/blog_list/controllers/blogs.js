const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog.toJSON())
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body
	const upvoteValue = Boolean(body.upvotes) ? body.upvotes : 0
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		upvotes: upvoteValue
	})

	const savedBlog = await blog.save()
	response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = blogsRouter
