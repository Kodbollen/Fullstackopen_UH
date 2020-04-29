import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useField} from '../hooks'
import loginService from '../services/login'
import {setUser} from '../reducers/userReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {addTimeout, removeTimeout} from '../reducers/timeoutReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useField('text')
    const password = useField('password')
    const timeoutId = useSelector(state => state.timeoutId)
    

    const createNotification = (message) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        dispatch(setNotification(message, 'error'))
        const nId = setTimeout(() => {
            dispatch(removeNotification())
            dispatch(removeTimeout())
		}, 5000)
        dispatch(addTimeout(nId))
	}
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username: username.value, password: password.value})
            console.log(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            dispatch(setUser(user))
		} catch(exception) {
            createNotification(exception.message)
		}
    }

    return (
        <form onSubmit={handleLogin}>
          <div>
            username:<input {...username} />
          </div>
          <div>
            password:<input {...password} />
          </div>
          <button id='loginButton' type='submit'>Login</button>
        </form>
    )
}

export default LoginForm
