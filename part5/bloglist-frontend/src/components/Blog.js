import React, {useState, useImperativeHandle} from 'react'

const Blog = React.forwardRef(({blog, putBlog}, ref) => {
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

    const hideOnVisibility = {display: contentVisibility ? '' : 'none'}

    useImperativeHandle(ref, ()=> {
        return {
            toggleVisibility
		}
	})
	
    return (
        <div style={blogStyle}>
          {blog.title} written by {blog.author}<button onClick={toggleVisibility}>{contentVisibility ? 'show' : 'hide'} details</button>
          <div style={hideOnVisibility}>
            <p>url: {blog.url}</p>
            <div>
              upvotes: {blog.upvotes}<button onClick={updateBlog}>upvote</button>
			</div>
		  </div>
        </div>
    )
})

export default Blog
