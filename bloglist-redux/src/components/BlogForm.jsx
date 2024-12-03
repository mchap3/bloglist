import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')
  const dispatch = useDispatch()

  const submitBlogForm = (event) => {
    event.preventDefault()

    dispatch(createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
    }))

    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')

    blogFormRef.current.toggleVisibility()
  }

  const blogFormRef = useRef()

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={submitBlogForm}>
        <h2>Create New</h2>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            value={blogURL}
            onChange={({ target }) => setBlogURL(target.value)}
            id="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
