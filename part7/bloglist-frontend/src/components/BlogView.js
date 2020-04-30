import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {upvoteBlog, removeBlog} from '../reducers/blogReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {addTimeout, removeTimeout} from '../reducers/timeoutReducer'
import CommentSection from '../components/CommentSection'

const BlogView = ({blog}) => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
    const timeoutId = useSelector(state => state.timeoutId)

    const updateBlog = () => {
        dispatch(upvoteBlog(blog, user.token))
        createNotification(`'${blog.title}' was successfully upvoted`, 'info')
    }

    const deleteBlog = () => {
        // ---------TODO: Remove should clean up connected comments:----------
        // --- Create service function for deletion --------------------------
        // --- batch delete all comments tied to a blog id on removal of blog 
        // -------------------------------------------------------------------

        // if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        //     dispatch(removeBlog(blog, user.token))
        //     createNotification(`'${blog.title}' was successfully deleted`, 'info')
        // }
        createNotification('Functionality disabled. Cleanup of abandoned children (comments) needed!', 'error')
    }
    
    const createNotification = (message, type) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        dispatch(setNotification(message, type))
        const nId = setTimeout(() => {
            dispatch(removeNotification())
            dispatch(removeTimeout())
		}, 5000)
        dispatch(addTimeout(nId))
	}

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
          <CommentSection blog={blog}/>
        </div>
    )
}

export default BlogView
