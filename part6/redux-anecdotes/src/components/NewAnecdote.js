import React from 'react'
import {useDispatch} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
	}

    return (
        <div>
          <h2>Create new anecdote</h2>
          <form onSubmit={createAnecdote}>
            <input name='anecdote'/>
            <button type='submit'>Add</button>
		  </form>
        </div>
	)
}

export default NewAnecdote
