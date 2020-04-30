import React from 'react'
import Notification from '../components/Notification'
import BlogContent from '../components/BlogContent'
import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'

const BlogPage = () => {
    
    const newBlogRef = React.createRef()
	
    return (
	    <div>
          <Notification />
          <BlogContent />
          <Togglable buttonLabel={'Create new blog'} ref={newBlogRef}>
            <NewBlog />
          </Togglable>
        </div>)
}

export default BlogPage
