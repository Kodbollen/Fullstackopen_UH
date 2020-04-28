import blogService from '../services/blogs'

const reducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)
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
	}

	
	return state
}

export const addBlog = (blog) => {
	return async dispatch => {
		const newBlog = blogService.create(blog)
		dispatch({
			type: 'ADD_BLOG',
			data: newBlog
		})
	}
}

export const removeBlog = (blog) => {
	return async dispatch => {
		await blogService.remove(blog)
		dispatch({
			type: 'REMOVE_BLOG',
			data: {id: blog.id}
		})
	}
}

export const updateBlog = (blog) => {
	return async dispatch => {
		const updated = await blogService.put(blog)
		dispatch({
			type: 'ADD_VOTE',
			data: {id: blog.id}
		})
	}
}

export const initialiseBlogs = () => {
	return async dispatch => {
		const blogs = blogService.getAll()
		dispatch({
			type: 'INITIALISE_BLOGS',
			data: blogs
		})
	}
}

export default reducer
