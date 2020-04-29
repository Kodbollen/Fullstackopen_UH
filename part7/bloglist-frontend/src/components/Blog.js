import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {upvoteBlog, removeBlog} from '../reducers/blogReducer'

const Blog = ({blog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
    const [contentVisibility, setContentVisibility] = useState(false)

    const toggleVisibility = () => {
        setContentVisibility(!contentVisibility)
    }

    const updateBlog = () => {
        dispatch(upvoteBlog(blog, user.token))
    }

    const deleteBlog = () => {
        if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
            dispatch(removeBlog(blog, user.token))
        }
    }

    const hideOnVisibility = {display: contentVisibility ? '' : 'none'}

    return (
        <div className='blogDiv' style={blogStyle}>
          {blog.title} written by {blog.author}<button className='toggleDetails' onClick={toggleVisibility}>
                                                 {contentVisibility ? 'hide' : 'show'} details
                                               </button>
          <div className='detailsDiv' style={hideOnVisibility}>
            <p>url: {blog.url}</p>
            <div className='upvoteDiv'>
              upvotes: {blog.upvotes}<button className='upvoteButton' onClick={updateBlog}>upvote</button>
              <div>
            {user.username === blog.user.username ? <button className='removeBtn' onClick={deleteBlog}>remove</button> : null}
              </div>
            </div>
          </div>
        </div>
    )
}

export default Blog
