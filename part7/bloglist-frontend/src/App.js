import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import CurrentUser from './components/CurrentUser'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {setUser} from './reducers/userReducer'
import {initialiseBlogs, upvoteBlog, removeBlog} from './reducers/blogReducer'
import './App.css'

const InfoBar = ({infoMessage, infoType}) => {
    if (infoMessage === '') return null
    return (
        <div className={infoType}>{infoMessage}</div>
    )
}

const BlogContent = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const sorted = blogs.sort((a, b) => {
        return b.upvotes - a.upvotes
	})

    const putBlog = async (blogObject) => {
        // await blogService.put(blogObject, user.token)
        // const blogs = await blogService.getAll()
        // setBlogs(blogs)
        dispatch()
	}

    const deleteBlog = async (blogObject) => {
        await blogService.remove(blogObject, user.token)
        const blogs = await blogService.getAll()
        // setBlogs(blogs)
	}
    return (
        <div>
          <h2>blogs</h2>
          {sorted.map(blog => <Blog key={blog.id} blog={blog} putBlog={upvoteBlog} deleteBlog={deleteBlog} user={user}/>)}
        </div>
    )
}



const App = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [infoMessage, setInfoMessage] = useState('')
    const [infoType, setInfoType ] = useState('info')

    const user = useSelector(state => state.user)
    
    const addBlog = (blogObject) => {
        newBlogRef.current.toggleVisibility()
        blogService.create(blogObject, user.token)
        setInfoType('info')
        setInfoMessage(`A new blog '${blogObject.title}' by ${blogObject.author} was created`)
        setTimeout(() => {
            setInfoMessage('')
		}, 5000)
	}

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
              <InfoBar infoMessage={infoMessage} infoType={infoType}/>
              <LoginForm />
			</div>
        )
    }
    return (
        <div>
          <InfoBar infoMessage={infoMessage} infoType={infoType}/>
          <CurrentUser />
          <BlogContent />
          <Togglable buttonLabel={'Create new blog'} ref={newBlogRef}>
            <NewBlog addBlog={addBlog}/>
          </Togglable>
        </div>
    )
}

export default App

