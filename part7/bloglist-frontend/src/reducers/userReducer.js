import loginService from '../services/login'

const reducer = (state = null, action) => {
	switch(action.type) {
	case 'SET_USER':
		return action.data.user
	case 'REMOVE_USER':
		return null
	}
	return state
}

export const setUser = (user) => {
	return async dispatch => {
		dispatch({
			type: 'SET_USER',
			data: user
		})
	}
}

export const removeUser = () => {
	return async dispatch => {
		dispatch({
			type: 'REMOVE_USER'
		})
	}
}

export default reducer
