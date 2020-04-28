import React from 'react'
import {
    Link, useParams
} from 'react-router-dom'

const AnecdoteList = ({anecdotes, setAnecdotes}) => {

    const anecdoteById = (id) =>
          anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    const id = useParams().id
    if (id) {
        const anecdote = anecdotes.find(a => a.id === id)
        return (
            <div>
              <h2>{anecdote.content}</h2>
              <p>Has {anecdote.votes} votes</p>
              <div>
                For more info see <a href={anecdote.info}>{anecdote.info}</a>
              </div>
			</div>
		)
	}

	return(
		<div>
          <h2>Anecdotes</h2>
          <ul>
            {anecdotes.map(anecdote =>
                           <li key={anecdote.id}>
                             <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                           </li>)}
          </ul>
        </div>
    )
}

export default AnecdoteList







