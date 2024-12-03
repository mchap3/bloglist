import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

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
    <Navbar fixed='top' collapseOnSelect expand='sm' className='bg-primary navbar' variant='dark'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Navbar.Brand>BlogList App</Navbar.Brand>
          <Nav.Link as={Link} to='/'>Blogs</Nav.Link>
          <Nav.Link as={Link} to='/users'>Users</Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          <Navbar.Text>
            Logged in as {user.name}
          </Navbar.Text>
          <Button className='ms-2' variant='outline-secondary' onClick={handleLogout}>logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar