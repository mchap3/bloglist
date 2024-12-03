import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Users from './routes/Users'
import User from './routes/User'
import BlogView from './routes/BlogView'
import { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

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
    <Router>
      <div>
        <NavBar />
        <Notification />
        {/* <h2>Blog App</h2> */}
      </div>

      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
        <Route path='/blogs/:id' element={<BlogView />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

const Home = () => {
  return (
    <div>
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default App
