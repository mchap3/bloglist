import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { displayConfirmation, displayError } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(blogObject)
      dispatch(appendBlog(createdBlog))
      dispatch(displayConfirmation(`Created blog '${createdBlog.title}' by ${createdBlog.author}`))
    } catch (error) {
      dispatch(displayError(error.response.data.error))
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.remove(id)
    const blogs = getState().blogs
    dispatch(setBlogs(blogs.filter(blog => blog.id !== id)))
    dispatch(displayConfirmation('Blog entry deleted'))
  }
}

export const updateBlog = (updatedBlog) => {
  return async (dispatch, getState) => {
    const id = updatedBlog.id
    await blogService.update(id, updatedBlog)
    const blogs = getState().blogs
    dispatch(setBlogs(blogs.map(blog =>
      blog.id !== id
        ? blog
        : updatedBlog
    )))
    // dispatch(displayConfirmation(`You liked '${updatedBlog.title}'`))
  }
}

export const commentToBlog = (id, commentObject) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.addComment(id, commentObject)
    const blogs = getState().blogs
    dispatch(setBlogs(blogs.map(blog =>
      blog.id !== id
        ? blog
        : updatedBlog
    )))
  }
}

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer