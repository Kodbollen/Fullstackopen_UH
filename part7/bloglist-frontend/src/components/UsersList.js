import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const User = (user) => {
    if (!user) return null
    console.log(user)
    return (
        <tr>
          <td>
            <Link to={`/users/${user.user.id}`}>{user.user.name}</Link>
          </td>
          <td>
            {user.user.blogs.length}
          </td>
	    </tr>
    )
}

const UsersList = () => {
    const users = useSelector(state => state.usersInfo)
    console.log(users)

    return (
        <div>
          <h2>Users</h2>
          <table>
            <tbody>
              <tr>
                <th>User</th>
                <th>Blogs created</th>
              </tr>
              {users.map(user => <User key={user.id} user={user} />)}
            </tbody>
          </table>
        </div>
    )
}

export default UsersList
