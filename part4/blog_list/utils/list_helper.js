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

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return {}
	const authors = blogs.map(blog => blog.author)
	const author = authors.sort(
		(prev, cur) =>
			authors.filter(author => author === prev).length -
			authors.filter(author => author === cur).length).pop()
	const blogCount = blogs.filter(blog => blog.author === author).length

	return {author: author, blogs: blogCount}
	
}

module.exports = {
	dummy,
	totalUpvotes,
	favouriteBlog,
	mostBlogs
}
