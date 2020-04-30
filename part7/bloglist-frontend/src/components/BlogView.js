import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {upvoteBlog, removeBlog} from '../reducers/blogReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {addTimeout, removeTimeout} from '../reducers/timeoutReducer'

const BlogView = ({blog}) => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
    const timeoutId = useSelector(state => state.timeoutId)
    const [contentVisibility, setContentVisibility] = useState(false)

    const toggleVisibility = () => {
        setContentVisibility(!contentVisibility)
    }

    const updateBlog = () => {
        dispatch(upvoteBlog(blog, user.token))
        createNotification(`'${blog.title}' was successfully upvoted`, 'info')
    }

    const deleteBlog = () => {
        if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
            dispatch(removeBlog(blog, user.token))
            createNotification(`'${blog.title}' was successfully deleted`, 'info')
        }
    }
    
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

    const hideOnVisibility = {display: contentVisibility ? '' : 'none'}

    return (
        <div>
          <h2>{blog.title} written by {blog.author}</h2>
          <a href={'#'}>{blog.url}</a>
          <div>
            upvotes: {blog.upvotes}<button className='upvoteButton' onClick={updateBlog}>upvote</button>
            <div>
              {user.username === blog.user.username ? <button className='removeBtn' onClick={deleteBlog}>remove</button> : null}
            </div>
          </div>
          {/* <h3>Comments</h3> */}
        </div>
    )
}

export default BlogView
