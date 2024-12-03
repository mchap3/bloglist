import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useNotification } from '../contexts/NotificationContext'

const BlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const queryClient = useQueryClient()
  const displayNotification = useNotification()
  const blogFormRef = useRef()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      displayNotification(`You created new blog '${newBlog.title}'`, 'confirmation')
    },
    onError: (error) => {
      displayNotification(error.response.data.error, 'error')
    }
  })

  const submitBlogForm = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    }

    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')

    newBlogMutation.mutate(blogObject)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form onSubmit={submitBlogForm}>
        <h2>Create New</h2>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
            id='title'
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
            id='author'
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            value={blogURL}
            onChange={({ target }) => setBlogURL(target.value)}
            id='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </Togglable>
  )
}


export default BlogForm