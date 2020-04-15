const dummy = (blogs) => {
	return 1
}

const totalUpvotes = (blogs) => {
	return blogs.map(blog => blog.upvotes).reduce((acc, val) => acc + val, 0)
}

const favouriteBlog = (blogs) => {
	if (blogs.length === 0) return {}
	const index = blogs.map(blog => blog.upvotes).indexOf(Math.max(...blogs.map(blog => blog.upvotes)))
	const favourite = blogs[index]
	const returnObject = {
		title: favourite.title,
		author: favourite.author,
		upvotes: favourite.upvotes
	}
	return returnObject
}

module.exports = {
	dummy,
	totalUpvotes,
	favouriteBlog
}
