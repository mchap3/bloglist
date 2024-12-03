import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayError } from './notificationReducer'

const reHydrateUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return user
  }
  return null
}

const userSlice = createSlice({
  name: 'user',
  initialState: reHydrateUser(),
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const loginUser = (loginObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(displayError('Incorrect username or password'))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer