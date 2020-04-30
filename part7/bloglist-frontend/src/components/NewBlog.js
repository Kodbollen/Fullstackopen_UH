import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useField} from '../hooks'
import {addBlog} from '../reducers/blogReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {addTimeout, removeTimeout} from '../reducers/timeoutReducer'

const NewBlog = () => {
    const dispatch = useDispatch()

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const user = useSelector(state => state.user)
    const timeoutId = useSelector(state => state.timeoutId)

    const createNotification = (message) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        dispatch(setNotification(message, 'info'))
        const nId = setTimeout(() => {
            dispatch(removeNotification())
            dispatch(removeTimeout())
		}, 5000)
        dispatch(addTimeout(nId))
	}

    const createBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        dispatch(addBlog(newBlog, user.token))
        createNotification(`you created: '${newBlog.title}' by ${newBlog.author}`)
    }

    return (
        <form onSubmit={createBlog}>
            <div>
                <h1>Create new blog</h1>
                <div>
                  title:<input id='title' {...title} />
                </div>
                <div>
                  author:<input id='author' {...author} />
                </div>
                <div>
                  url:<input id='url' {...url} />
                </div>
                <button id='submitBlogForm' type='submit'>Create</button>
            </div>
        </form>
    )
}

export default NewBlog
