import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeUser} from '../reducers/userReducer'

const CurrentUser = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const logoutUser = () => {
        dispatch(removeUser())
        window.localStorage.removeItem('loggedUser')
    }
    return (
        <div>
          <p>Current user: {user.username}</p>
          <button type='button' onClick={logoutUser}>Logout</button>
        </div>
    )
}

export default CurrentUser
