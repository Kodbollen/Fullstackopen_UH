import React from 'react'
import {useDispatch} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        await anecdoteService.createNew(content)
        dispatch(addAnecdote(content))

        const message = `You created '${content}'`
        dispatch(setNotification(message, 5))
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
