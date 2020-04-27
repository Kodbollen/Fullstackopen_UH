const reducer = (state = '', action) => {
	console.log('state now: ', state)
	console.log('action', action)
	switch(action.type) {
	case 'SET_MESSAGE':
		return action.data.message
	case 'REMOVE_MESSAGE':
		return ''
	default:
	}
	return state
}

export const setNotification = (message) => {
	return {
		type: 'SET_MESSAGE',
		data: {message}
	}
}

export const removeNotification = () => {
	return {type: 'REMOVE_MESSAGE'}
}

export default reducer
