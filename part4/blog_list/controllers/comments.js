const commentRouter = require('express').Router()
require('express-async-errors')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

commentRouter.get('/', async (request, response) => {
	const comments = await Comment.find({})
		  .populate('user', {username: 1, name: 1})
		  .populate('blog', {_id: 1})
	response.json(comments.map(comment => comment.toJSON()))
})

commentRouter.get('/:id', async (request, response) => {
	const comment = await Comment.findById(request.params.id)
	if (comment) {
		response.json(comment.toJSON())
	} else {
		response.status(404).end()
	}
})

commentRouter.post('/', async (request, response) => {
	const body = request.body
	const token = request.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return response.status(401).json({error: 'token missing or invalid'})
	}
	const user = await User.findById(decodedToken.id)
	const blog = await Blog.findById(body.blogId)


	const comment = new Comment({
		content: body.content,
		date: new Date(),
		blog: blog._id,
		user: user._id
	})

	const savedComment = await comment.save()
	blog.comments = blog.comments.concat(savedComment._id)
	blog.save()
	
	response.json(savedComment.toJSON())
})

// commentRouter.put('/:id', async (request, response) => {

// })

// commentRouter.delete('/:id', async (request, response) => {

// })

module.exports = commentRouter
