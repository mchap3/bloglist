import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className='navbar'>
      <Link style={padding} to={'/'}>Blogs</Link>
      <Link style={padding} to={'/users'}>Users</Link>
      <span style={padding}>
        Logged in as {user.name} <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  )
}

export default NavBar