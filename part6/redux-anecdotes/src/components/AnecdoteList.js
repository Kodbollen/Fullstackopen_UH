import React from 'react'
import {connect} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {addTimeout, removeTimeout} from '../reducers/timeOutReducer'

const Anecdote = ({anecdote, clickHandler}) => {

    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={clickHandler}>vote</button>
          </div>
        </div>
	)
}

const AnecdoteList = (props) => {
    const filter = props.filter

    let anecdotes
    if (filter) {
        anecdotes = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        anecdotes.sort((a, b) => b.votes - a.votes)
    } else {
        anecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)
    }

    const clickHandler = (anecdote) => {
        props.addVote(anecdote)
        const message = `You voted for '${anecdote.content}'`
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
          {anecdotes.map(anecdote =>
                      <Anecdote key={anecdote.id}
                                anecdote={anecdote}
                                clickHandler={() => clickHandler(anecdote)}/>)}
        </div>
	)
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        timeoutId: state.timeoutId
    }
}

const mapDispatchToProps = {
    addVote, setNotification, removeNotification, addTimeout, removeTimeout
}

const connectedAnnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps)(AnecdoteList)

export default connectedAnnecdotes



