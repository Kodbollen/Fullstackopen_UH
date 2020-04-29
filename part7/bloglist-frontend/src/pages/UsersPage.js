import React from 'react'
import Notification from '../components/Notification'
import CurrentUser from '../components/CurrentUser'
import UsersList from '../components/UsersList'

const BlogPage = () => {
    
    const newBlogRef = React.createRef()
	
    return (
	    <div>
          <Notification />
          <CurrentUser />
          <UsersList />
        </div>)
}

export default BlogPage
