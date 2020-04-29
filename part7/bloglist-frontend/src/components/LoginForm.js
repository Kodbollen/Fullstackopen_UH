import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useField} from '../hooks'
import loginService from '../services/login'
import {setUser} from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useField('text')
    const password = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username: username.value, password: password.value})
            console.log(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            dispatch(setUser(user))
		} catch(exception) {
            console.log(exception.message)
            // setInfoType('error')
            // setInfoMessage(exception.message)
            // setTimeout(() => {
            //     setInfoMessage('')
			// }, 5000)
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
