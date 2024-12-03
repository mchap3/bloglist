import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={submitBlogForm}>
        <h2>Create New</h2>
        <div>
          <Form.Label htmlFor="title">
            Title:
            <Form.Control
              type="text"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
              id="title"
            />
          </Form.Label>
        </div>
        <div>
          <Form.Label htmlFor="author">
            Author:
            <Form.Control
              type="text"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
              id="author"
            />
          </Form.Label>
        </div>
        <div>
          <Form.Label htmlFor="url">
            URL:
            <Form.Control
              type="text"
              value={blogURL}
              onChange={({ target }) => setBlogURL(target.value)}
              id="url"
            />
          </Form.Label>
        </div>
        <Button type="submit">create</Button>
      </Form>
    </Togglable>
  )
}

export default BlogForm
