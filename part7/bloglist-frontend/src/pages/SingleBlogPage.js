import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import BlogView from '../components/BlogView'

const SingleBlogPage = () => {
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(blog => blog.id === id)

    if (!blog) {
        return (
            <div>The blog does not exist</div>
		)
	}
    return (
        <BlogView blog={blog}/>
    )
}

export default SingleBlogPage
