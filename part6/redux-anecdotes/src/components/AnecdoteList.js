import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'


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
    const anecdotes = useSelector(state => state)
    anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <div>
          {anecdotes.map(anecdote =>
                         <Anecdote key={anecdote.id}
                                   anecdote={anecdote}
                                   clickHandler={() => dispatch(addVote(anecdote.id))}/>)}
        </div>
	)
}

export default AnecdoteList



