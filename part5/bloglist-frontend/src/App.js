import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


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
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            console.log(`Loggin in as ${username}`)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')
		} catch(exception) {
            
		}
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
            setUser(JSON.parse(loggedUser))
		}
    }, [])

    return (
        <div>
          {user === null && <LoginForm handleLogin={handleLogin}
                                       username={username} setUsername={setUsername}
                                       password={password} setPassword={setPassword}/>}
          {user !== null && <CurrentUser user={user} setUser={setUser}/>}
          {user !== null && <BlogContent blogs={blogs}/>}
        </div>
    )
}

export default App
