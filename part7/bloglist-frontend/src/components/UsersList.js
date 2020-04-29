import React from 'react'
import {useSelector} from 'react-redux'

const User = (user) => {
    if (!user) return null
    return (
        <tr>
          <td>{user.user.name}</td>
          <td>{user.user.blogs.length}</td>
	    </tr>
    )
}

const UsersList = () => {
    const users = useSelector(state => state.usersInfo)


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
