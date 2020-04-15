const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
	Blog.find({})
		.then(blogs => {
			response.json(blogs.map(blog => blog.toJSON()))
		})
})

blogsRouter.post('/', (request, response, next) => {
	const body = request.body
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		upvotes: body.upvotes
	})

	blog.save()
		.then(result => {
			response.status(201).json(result)})
		.catch(error => next(error))
})

module.exports = blogsRouter
