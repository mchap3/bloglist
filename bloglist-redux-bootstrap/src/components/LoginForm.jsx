import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const submitLoginForm = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={submitLoginForm}>
      <div>
        <Form.Label>
          Username
          <Form.Control
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Label>
      </div>
      <div>
        <Form.Label>
          Password
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Label>
      </div>
      <div>
        <Button variant='primary' type="submit">login</Button>
      </div>
    </Form>
  )
}

export default LoginForm
