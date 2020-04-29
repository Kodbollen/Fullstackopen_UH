import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('Notification reducer', () => {
	test('Able to set message', () => {
		const state = ''
		const action = {
			type: 'SET_MESSAGE',
			data: {message: 'Fresh message!', notiType: 'info'}
		}

		deepFreeze(state)
		const newState = notificationReducer(state, action)

		expect(newState).toEqual({message: 'Fresh message!', notiType: 'info'})
	})
	test('Able to remove message', () => {
		const state = 'This message ought to be removed!'
		const action = {
			type: 'REMOVE_MESSAGE'
		}

		deepFreeze(state)
		const newState = notificationReducer(state, action)

		expect(newState).toEqual({})
	})
})
