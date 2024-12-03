import { useEffect, useContext } from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { useNotification } from './contexts/NotificationContext'
import UserContext from './contexts/UserContext'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const displayNotification = useNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET_USER',
        payload: loggedUser
      })
      blogService.setToken(loggedUser.token)
    }
  }, [userDispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    userDispatch({ type: 'CLEAR_USER' })
    displayNotification('you have logged out', 'confirmation')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to BlogList App</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        Logged in as {user.name} <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <BlogForm />
      <BlogList/>
    </div>
  )
}

export default App