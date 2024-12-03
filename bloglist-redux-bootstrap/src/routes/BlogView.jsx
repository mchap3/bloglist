import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { updateBlog, removeBlog, commentToBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'

const BlogView = () => {
  const user = useSelector(state => state.user)

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(updatedBlog))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const commentObject = {
      content: comment
    }
    dispatch(commentToBlog(blog.id, commentObject))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>
        Likes: {blog.likes} <Button size='sm' onClick={handleLike}>like</Button>
      </p>
      <p>Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></p>
      {user.username !== blog.user.username
        ? null
        : <Button variant='danger' onClick={handleRemove}>remove</Button>
      }

      <h3>Comments</h3>
      <Form onSubmit={handleComment}>
        <InputGroup className='w-50'>
          <Form.Control
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type='submit'>add comment</Button>
        </InputGroup>
      </Form>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li> )}
      </ul>
    </div>
  )
}

export default BlogView