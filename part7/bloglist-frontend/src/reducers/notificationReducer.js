const reducer = (state = {}, action) => {
	switch(action.type) {
	case 'SET_MESSAGE':
		return action.data
	case 'REMOVE_MESSAGE':
		return {}
	default:
	}
	return state
}

export const setNotification = (message, notiType) => {
	return {
		type: 'SET_MESSAGE',
		data: {message: message, notiType: notiType}
	}
}

export const removeNotification = () => {
	return {type: 'REMOVE_MESSAGE'}
}

export default reducer
