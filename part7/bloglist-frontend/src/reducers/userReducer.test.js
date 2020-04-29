import userReducer from './userReducer'
import loginService from '../services/login'
import deepFreeze from 'deep-freeze'

describe('User reducer', () => {
	test('User can be set (logged in)', () => {
		const user = {
			blogs: [],
			username: 'tester',
			name: 'testminister',
			id: '5ea378f7f46028479d4f94ed'
		}
		const state = null
		const action = {
			type: 'SET_USER',
			data: {user}
		}

		const newState = userReducer(state, action)

		expect(newState).toEqual(user)
	})
	test('User can be removed (logged out)', () => {
		const user = {
			blogs: [],
			username: 'tester',
			name: 'testminister',
			id: '5ea378f7f46028479d4f94ed'
		}
		const state = user
		const action = {
			type: 'REMOVE_USER'
		}

		deepFreeze(state)
		const newState = userReducer(state, action)

		expect(newState).toBe(null)
	})	
})
