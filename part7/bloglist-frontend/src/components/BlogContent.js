import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Blog from './Blog'

const BlogContent = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const sorted = blogs.sort((a, b) => {
        return b.upvotes - a.upvotes
	})
    return (
        <div>
          <h2>blogs</h2>
          {sorted.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

export default BlogContent
