const reducer = (state = '', action) => {
	console.log('state now: ', state)
	console.log('action', action)
	switch(action.type) {
	case 'SET_TIMEOUT':
		return action.data.id
	case 'CLEAR_TIMEOUT':
		return ''
	default:
	}
	return state
}

export const addTimeout = (id) => {
	return async dispatch => {
		dispatch({
			type: 'SET_TIMEOUT',
			data: {id}
		})
	}
}

export const removeTimeout = (id) => {
	return async dispatch => {
		dispatch({
			type: 'CLEAR_TIMEOUT'
		})
	}
}

export default reducer
