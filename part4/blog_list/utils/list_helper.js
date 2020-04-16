const dummy = () => {
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

const mostUpvotes = (blogs) => {
	if (blogs.length === 0) return {}
	let results = []
	// unique list of authors
	const authors = [... new Set(blogs.map(blog => blog.author))]
	// concat {author, totalUpvotes} to result
	authors.forEach(author => {
		const upvotes = totalUpvotes(blogs.filter(blog => blog.author === author))
		results = results.concat({author: author, upvotes: upvotes})
	})
	// find index of highest upvote count
	const index = results.map(author => author.upvotes).indexOf(Math.max(...results.map(author => author.upvotes)))

	return results[index]
	
}

module.exports = {
	dummy,
	totalUpvotes,
	favouriteBlog,
	mostBlogs,
	mostUpvotes
}
