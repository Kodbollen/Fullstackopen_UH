import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
    return (
        <div>
          <Notification />
          <h2>Anecdotes</h2>
          <AnecdoteList />
          <NewAnecdote />
        </div>
    )
}

export default App
