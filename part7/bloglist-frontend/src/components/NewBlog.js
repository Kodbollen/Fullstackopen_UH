import React, {useState} from 'react'

const NewBlog = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = () => {
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        addBlog(newBlog)
    }
    return (
        <form onSubmit={createBlog}>
            <div>
                <h1>Create new blog</h1>
                <div>
                  title:<input id='title' type='text' value={title} name='title' onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    author:<input id='author' type='text' value={author} name='author' onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    url:<input id='url' type='text' value={url} name='url' onChange={({target}) => setUrl(target.value)}/>
                </div>
                <button id='submitBlogForm' type='submit'>Create</button>
            </div>
        </form>
    )
}

export default NewBlog
