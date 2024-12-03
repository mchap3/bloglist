import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  style: 'confirmation'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      state.message = ''
    }
  }
})

export const displayConfirmation = (message) => {
  return async (dispatch) => {
    dispatch(setNotification({
      message,
      style: 'confirmation'
    }))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export const displayError = (message) => {
  return async (dispatch) => {
    dispatch(setNotification({
      message,
      style: 'error'
    }))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer