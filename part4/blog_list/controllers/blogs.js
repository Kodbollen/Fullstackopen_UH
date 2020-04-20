const blogsRouter = require('express').Router()
require('express-async-errors')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
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

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return response.status(401).json({error: 'token missing or invalid'})
	}
	const user = await User.findById(decodedToken.id)

	const upvoteValue = body.upvotes ? body.upvotes : 0
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		upvotes: upvoteValue,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	
	response.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		upvotes: body.upvotes ? body.upvotes : 0
	}
	if (!newBlog.title || !newBlog.author
		|| !newBlog.url) {
		return response.status(400).json({error: 'Cannot modify blog. Malformatted data'})
	}
	const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
	response.json(blogToUpdate.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)

	if (!decodedToken.id === blog.user.id) {
		response.status(400).json({error: 'Missing privilege: cannot delete blog owned by another user'})
	}
	
	await blog.remove()
	response.status(204).end()
})

module.exports = blogsRouter
// -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVlOWNlOTRjZWFjNTg5NWVmNDcyNzUxYiIsImlhdCI6MTU4NzM3NjA4OX0.WOPkhWCUvJFsfAmHXgfBXDuA4IK1ubb7k91wT_3t-0c'
