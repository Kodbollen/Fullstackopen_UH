import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('Anecdote reducer', () => {
	test('Votes increment properly', () => {
		const exampleAnecdote = {
			content: 'testing is fun',
			id: 1,
			votes: 0
		}
		const state = [exampleAnecdote]
		const action = {
			type: 'ADD_VOTE',
			data: exampleAnecdote
		}

		deepFreeze(state)
		const newState = anecdoteReducer(state, action)

		expect(newState.length).toBe(1)
		expect(newState).toContainEqual({...exampleAnecdote, votes: 1})
	})
	test('Anecdote can be added', () => {
		const exampleAnecdote = {
			content: 'testing is fun',
			id: 1,
			votes: 0
		}
		const newAnecdote = {
			content: 'adding this anecdote',
			id: 2,
			votes: 0
		}
		const state = [exampleAnecdote]
		const action = {
			type: 'ADD_ANECDOTE',
			data: newAnecdote
		}

		deepFreeze(state)
		const newState = anecdoteReducer(state, action)

		expect(newState.length).toBe(2)
		expect(newState).toContainEqual(state[0])
		expect(newState).toContainEqual(newAnecdote)
	})
})
