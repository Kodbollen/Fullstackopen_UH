import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('Filter reducer', () => {
	test('Able to set filter', () => {
		const state = ''
		const action = {
			type: 'SET_FILTER',
			data: {filter: 'deb'}
		}

		deepFreeze(state)
		const newState = filterReducer(state, action)

		expect(newState).toBe('deb')
	})
})
