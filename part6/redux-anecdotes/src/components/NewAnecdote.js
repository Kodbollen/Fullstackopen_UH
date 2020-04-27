import React from 'react'
import {connect} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        await anecdoteService.createNew(content)
        props.addAnecdote(content)

        const message = `You created '${content}'`
        props.setNotification(message, 5)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    addAnecdote, setNotification
}

const connectedNewAnecdote = connect(mapStateToProps, mapDispatchToProps)(NewAnecdote)
export default connectedNewAnecdote
