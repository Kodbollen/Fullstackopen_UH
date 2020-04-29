const reducer = (state = '', action) => {
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

export const removeTimeout = () => {
	return async dispatch => {
		dispatch({
			type: 'CLEAR_TIMEOUT'
		})
	}
}

export default reducer
