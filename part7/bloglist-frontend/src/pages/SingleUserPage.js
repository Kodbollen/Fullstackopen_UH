import React from 'react'
import {useSelector} from 'react-redux'
import {useParams, Link} from 'react-router-dom'

const SingleUserPage = () => {
    const id = useParams().id
    const users = useSelector(state => state.usersInfo)
    const user = users.find(user => user.id === id)

	if (!user) {
		return (
            <div>
              The user doesn't exist
			</div>
		)
	}
    return (
	    <div>
          <h2>{user.name}</h2>
          <h3>Added blogs</h3>
          <ul>
            {user.blogs.map(blog => (
                <li key={blog.id}>
                  {/* <Link to={`/blogs/id`}>{blog.title} by {blog.author}</Link> */}
                  {blog.title} by {blog.author}
                </li>
            ))}
		  </ul>
        </div>
    )
}

export default SingleUserPage
