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

const NewBlog = ({title, setTitle, author, setAuthor, url, setUrl, user}) => {
    const createBlog = () => {
        const newBlog = {
            title: title,
            author: author,
            url: url
		}
        blogService.create(newBlog, user.token)
	}
    return (
        <form onSubmit={createBlog}>
          <div>
            <h1>Create new blog</h1>
            <div>
              title:<input type='text' value={title} name='title' onChange={({target}) => setTitle(target.value)}/>
	        </div>
            <div>
              author:<input type='text' value={author} name='author' onChange={({target}) => setAuthor(target.value)}/>
	        </div>
            <div>
              url:<input type='text' value={url} name='url' onChange={({target}) => setUrl(target.value)}/>
	        </div>
            <button type='submit'>Create</button>
          </div>
	    </form>
    )
}


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            // blogService.setToken(token)
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
            const user = JSON.parse(loggedUser)
            setUser(user)
            // blogService.setToken(user.token)
		}
    }, [])

    return (
        <div>
          {user === null && <LoginForm handleLogin={handleLogin}
                                       username={username} setUsername={setUsername}
                                       password={password} setPassword={setPassword}/>}
          {user !== null && <CurrentUser user={user} setUser={setUser}/>}
          {user !== null && <BlogContent blogs={blogs}/>}
          {user !== null && <NewBlog title={title} setTitle={setTitle}
                                     author={author} setAuthor={setAuthor}
                                     url={url} setUrl={setUrl} user={user}/>}
        </div>
    )
}

export default App
