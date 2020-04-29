import blogService from '../services/blogs'

const reducer = (state = [], action) => {
	switch(action.type) {
	case 'ADD_BLOG':
		return [...state, action.data]
	case 'REMOVE_BLOG':
		const idToRemove = action.data.id
		return state.filter(blog => blog.id !== idToRemove)
	case 'ADD_VOTE':
		const idToUpdate = action.data.id
		const blogToUpdate = state.find(blog => blog.id === idToUpdate)
		const updatedBlog = {...blogToUpdate, upvotes: blogToUpdate.upvotes + 1}
		return state.map(blog => blog.id === idToUpdate ? updatedBlog : blog)
	case 'INITIALISE_BLOGS':
		return action.data
	default:
	}
	return state
}

export const addBlog = (blog, token) => {
	return async dispatch => {
		const newBlog = await blogService.create(blog, token)
		dispatch({
			type: 'ADD_BLOG',
			data: newBlog
		})
	}
}

export const removeBlog = (blog, token) => {
	return async dispatch => {
		await blogService.remove(blog, token)
		dispatch({
			type: 'REMOVE_BLOG',
			data: {id: blog.id}
		})
	}
}

export const upvoteBlog = (blog, token) => {
	return async dispatch => {
		const {id, ...noId} = blog
		const newObject = {_id: id, upvotes: noId.upvotes + 1, author: blog.author, title: blog.title, url: blog.url, user:blog.user}
		await blogService.put(newObject, token)
		dispatch({
			type: 'ADD_VOTE',
			data: {id: blog.id}
		})
	}
}

export const initialiseBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INITIALISE_BLOGS',
			data: blogs
		})
	}
}

export default reducer
