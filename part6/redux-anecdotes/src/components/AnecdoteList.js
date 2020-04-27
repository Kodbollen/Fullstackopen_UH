import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

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
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    anecdotes.sort((a, b) => b.votes - a.votes)

    const clickHandler = (anecdote) => {
        dispatch(addVote(anecdote.id))
        const message = `You voted for '${anecdote.content}'`
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
		}, 5000)
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

export default AnecdoteList



