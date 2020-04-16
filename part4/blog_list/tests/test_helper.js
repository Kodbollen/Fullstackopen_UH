const Blog = require('../models/blog.js')

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

const nonExistingId = async () => {
	const blog = new Blog({title: 'asd', author: 'sdf', url: 'dfg', upvotes: 0})
	await blog.save()
	await blog.remove()
	
	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb
}
