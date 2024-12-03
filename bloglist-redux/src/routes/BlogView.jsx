import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateBlog, removeBlog, commentToBlog } from '../reducers/blogReducer'
import { useState } from 'react'

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
        Likes: {blog.likes} <button onClick={handleLike}>likes</button>
      </p>
      <p>Added by {blog.user.name}</p>
      {user.username !== blog.user.username
        ? null
        : <button onClick={handleRemove}>remove</button>
      }

      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li> )}
      </ul>
    </div>
  )
}

export default BlogView