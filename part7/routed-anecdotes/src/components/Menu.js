import React, {useState} from 'react'
import {
	BrowserRouter as Router,
	Switch, Route, Link, useHistory
} from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'

const Menu = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])
  const padding = {
    paddingRight: 5
  }
    return (
        <Router>
          <div>
            <Link style={padding} to='/'>anecdotes</Link>
            <Link style={padding} to='/create'>create new</Link>
            <Link style={padding} to='/about'>about</Link>
		  </div>

          <Switch>
            <Route path='/create'>
              <CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes}/>
			</Route>
            <Route path='/about'>
              <About />
			</Route>
            <Route path='/'>
              <AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
			</Route>
		  </Switch>
		</Router>
  )
}

export default Menu
