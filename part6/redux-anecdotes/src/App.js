import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {initialiseAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialiseAnecdotes())
	}, [dispatch])

    return (
        <div>
          <Notification />
          <h2>Anecdotes</h2>
          <Filter />
          <AnecdoteList />
          <NewAnecdote />
        </div>
    )
}

export default App
