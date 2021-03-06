import React, {useState} from 'react'

const Blog = ({blog, putBlog, deleteBlog, user}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [contentVisibility, setContentVisibility] = useState(false)

    const toggleVisibility = () => {
        setContentVisibility(!contentVisibility)
    }

    const updateBlog = () => {
        const updatedBlog = {
            _id: blog.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            upvotes: blog.upvotes + 1,
            user: blog.user
        }
        putBlog(updatedBlog)
    }

    const removeBlog = () => {
        if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
            deleteBlog(blog)
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
            {user.username === blog.user.username ? <button className='removeBtn' onClick={removeBlog}>remove</button> : null}
              </div>
            </div>
          </div>
        </div>
    )
}

export default Blog
