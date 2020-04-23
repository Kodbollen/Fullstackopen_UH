import React, {useState, useImperativeHandle} from 'react'

const Blog = React.forwardRef(({blog}, ref) => {
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
              upvotes: {blog.upvotes}<button>upvote</button>
			</div>
		  </div>
        </div>
    )
})

export default Blog
