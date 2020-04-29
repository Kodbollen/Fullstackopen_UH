import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import CurrentUser from './components/CurrentUser'
import LoginForm from './components/LoginForm'
import BlogContent from './components/BlogContent'
import {setUser} from './reducers/userReducer'
import {initialiseBlogs} from './reducers/blogReducer'
import './App.css'

const InfoBar = ({infoMessage, infoType}) => {
    if (infoMessage === '') return null
    return (
        <div className={infoType}>{infoMessage}</div>
    )
}
const App = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initialiseBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setUser(user))
		}
    }, [])

    const newBlogRef = React.createRef()

    if (user === null) {
        return (
            <div>
              <InfoBar />
              <LoginForm />
			</div>
        )
    }
    return (
        <div>
          <InfoBar />
          <CurrentUser />
          <BlogContent />
          <Togglable buttonLabel={'Create new blog'} ref={newBlogRef}>
            <NewBlog />
          </Togglable>
        </div>
    )
}

export default App

