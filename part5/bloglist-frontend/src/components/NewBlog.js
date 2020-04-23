import React, {useState} from 'react'
import blogService from '../services/blogs'

const NewBlog = ({user, setInfoType, setInfoMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = () => {
        const newBlog = {
            title: title,
            author: author,
            url: url
		}
        blogService.create(newBlog, user.token)
        setInfoType('info')
        setInfoMessage(`A new blog '${title}' by ${author} was created`)
        setTimeout(() => {
            setInfoMessage('')
		}, 5000)
        
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

export default NewBlog
