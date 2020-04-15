const dummy = (blogs) => {
	return 1
}

const totalUpvotes = (blogs) => {
	return blogs.map(blog => blog.upvotes).reduce((acc, val) => acc + val, 0)
}

module.exports = {
	dummy, totalUpvotes
}
