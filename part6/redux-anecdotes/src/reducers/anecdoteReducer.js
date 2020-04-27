import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)
	switch(action.type) {
	case 'ADD_VOTE':
		const id = action.data.id
		const anecdoteToUpdate = state.find(a => a.id === id)
		const updatedAnecdote = {
			...anecdoteToUpdate,
			votes: anecdoteToUpdate.votes + 1
		}
		return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
	case 'ADD_ANECDOTE':
		return [...state, action.data]
	case 'INIT_ANECDOTES':
		return action.data
	default:
	}
	return state
}

export const addVote = (anecdote) => {
	return async dispatch => {
		dispatch({
			type: 'ADD_VOTE',
			data: anecdote
		})
	}
}

export const addAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'ADD_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const initialiseAnecdotes = (anecdotes) => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
		type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}

export default reducer
