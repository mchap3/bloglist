import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const submitBlogForm = (event) => {
    event.preventDefault()

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
  }

  return (
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
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm