import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      errorNotification('Incorrect username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    confirmNotification('you have logged out')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      confirmNotification(`new blog "${returnedBlog.title}" created`)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      errorNotification(error.response.data.error)
    }
  }

  const updateBlog = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(
      blog => blog.id === returnedBlog.id
        ? returnedBlog
        : blog
    ))
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      confirmNotification('Blog successfully removed')
    } catch (error) {
      errorNotification(error.response.data.error)
    }
  }

  const confirmNotification = (message) => {
    setNotificationType('confirmation')
    setNotification(message)
    setTimeout(() => {
      setNotificationType(null)
      setNotification(null)
    }, 5000)
  }

  const errorNotification = (message) => {
    setNotificationType('error')
    setNotification(message)
    setTimeout(() => {
      setNotificationType(null)
      setNotification(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to BlogList App</h2>
        <Notification
          message={notification}
          type={notificationType}
        />
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification
        message={notification}
        type={notificationType}
      />
      <p>
        Logged in as {user.name} <button onClick={handleLogout}>
          logout
        </button>
      </p>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>

      {blogs.sort((a, b) => a.likes - b.likes).reverse().map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App