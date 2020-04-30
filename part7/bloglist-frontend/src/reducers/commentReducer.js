import commentService from '../services/comments'

const reducer = (state = [], action) => {
	switch(action.type) {
	case 'ADD_COMMENT':
		return [...state, action.data]
	case 'INITIALISE_COMMENTS':
		return action.data
	default:
	}
	return state
}

export const addComment = (comment, blog, token) => {
	return async dispatch => {
		const response = await commentService.create({content: comment, blogId: blog.id}, token)
		const commentObject = {content: comment, blog: {id: blog.id}, id: response.id}
		dispatch({
			type: 'ADD_COMMENT',
			data: commentObject
		})
	}
}

export const initialiseComments = () => {
	return async dispatch => {
		const comments = await commentService.getAll()
		dispatch({
			type: 'INITIALISE_COMMENTS',
			data: comments
		})
	}
}

export default reducer
