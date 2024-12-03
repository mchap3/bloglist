import { useState } from 'react'
import { useUserDispatch } from '../contexts/UserContext'
import { useNotification } from '../contexts/NotificationContext'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userDispatch = useUserDispatch()
  const displayNotification = useNotification()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      userDispatch({
        type: 'SET_USER',
        payload: user
      })
      setUsername('')
      setPassword('')
    } catch (error) {
      displayNotification('Incorrect username or password', 'error')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <div>
        <button type='submit'>login</button>
      </div>
    </form>
  )
}

export default LoginForm