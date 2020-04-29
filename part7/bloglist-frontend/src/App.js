import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogPage from './pages/BlogPage'
import UsersPage from './pages/UsersPage'
import {setUser} from './reducers/userReducer'
import {initialiseBlogs} from './reducers/blogReducer'
import {initialiseUsers} from './reducers/infoUserReducer'
import './App.css'

const App = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initialiseBlogs())
        dispatch(initialiseUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setUser(user))
		}
    }, [])

    if (user === null) {
        return (
            <div>
              <Notification />
              <LoginForm />
			</div>
        )
    }
    return (
        <Router>
          <Switch>
            <Route path='/blogs'>
              <BlogPage />
            </Route>
            <Route path='/users'>
              <UsersPage />
		    </Route>
            <Route path='/'>
              <BlogPage />
            </Route>
          </Switch>
        </Router>
    )
}

export default App

