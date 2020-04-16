const Blog = require('../models/blog.js')

const nonExistingId = async () => {
	const blog = new Blog({title: 'asd', author: 'sdf', url: 'dfg', upvotes: 0})
	await blog.save()
	await blog.remove()
	
	return blog._id.toString()
}

module.exports = {
	nonExistingId
}
