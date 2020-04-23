import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const InfoBar = ({infoMessage, infoType}) => {
    if (infoMessage === '') return null
    return (
        <div className={infoType}>{infoMessage}</div>
    )
}

const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => (
    <form onSubmit={handleLogin}>
      <div>
        username:<input type='text' value={username} name='username' onChange={({target}) => setUsername(target.value)}/>
	  </div>
      <div>
        password:<input type='password' value={password} name='password' onChange={({target}) => setPassword(target.value)}/>
	  </div>
      <button type='submit'>Login</button>
	</form>
)

const BlogContent = ({blogs}) => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
)

const CurrentUser = ({user, setUser}) => {
    const logoutUser = () => {
        setUser(null)
        window.localStorage.removeItem('loggedUser')
    }
    return (
        <div>
          <p>Current user: {user.username}</p>
          <button type='button' onClick={logoutUser}>Logout</button>
	    </div>
    )
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [infoMessage, setInfoMessage] = useState('')
    const [infoType, setInfoType ] = useState('info')
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')
		} catch(exception) {
            setInfoType('error')
            setInfoMessage(exception.message)
            setTimeout(() => {
                setInfoMessage('')                
			}, 5000)
		}
    }

    const addBlog =(blogObject) => {
        newBlogRef.current.toggleVisibility()
        blogService.create(blogObject, user.token)
        setInfoType('info')
        setInfoMessage(`A new blog '${blogObject.title}' by ${blogObject.author} was created`)
        setTimeout(() => {
            setInfoMessage('')
		}, 5000)
	}


    useEffect(() => {
        let ignore = false
        async function fetchBlogs () {
            const blogs = await blogService.getAll()
            if (!ignore) {
                setBlogs(blogs)
            }
        }
        fetchBlogs()
        return () => {ignore = true}
    }, [])
    
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            // blogService.setToken(user.token)
		}
    }, [])

    const newBlogRef = React.createRef()

    if (user === null) {
        return (
            <div>
              <LoginForm handleLogin={handleLogin}
                                       username={username} setUsername={setUsername}
                                       password={password} setPassword={setPassword}
                         setInfoType={setInfoType} setInfoMessage={setInfoMessage}/>
			</div>
        )
    }
    return (
        <div>
          <InfoBar infoMessage={infoMessage} infoType={infoType}/>
          <CurrentUser user={user} setUser={setUser}/>
          <BlogContent blogs={blogs}/>
          <Togglable buttonLabel={'Create new blog'} ref={newBlogRef}>
            <NewBlog addBlog={addBlog}/>
		  </Togglable>
        </div>
    )
}

export default App

