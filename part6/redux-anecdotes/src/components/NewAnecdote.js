import React from 'react'
import {connect} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {addTimeout, removeTimeout} from '../reducers/timeOutReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.valnue = ''

        await anecdoteService.createNew(content)
        props.addAnecdote(content)

        const message = `You created '${content}'`
        if (props.timeoutId) {
            clearTimeout(props.timeoutId)
            props.removeTimeout()
        }
        props.setNotification(message)
        const timeId = setTimeout(()=> {
            props.removeNotification(message)
            props.removeTimeout()
        }, 5000)
        props.addTimeout(timeId)

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
        filter: state.filter,
        timeoutId: state.timeoutId
    }
}

const mapDispatchToProps = {
    addAnecdote, setNotification, removeNotification, addTimeout, removeTimeout
}

const connectedNewAnecdote = connect(mapStateToProps, mapDispatchToProps)(NewAnecdote)
export default connectedNewAnecdote
