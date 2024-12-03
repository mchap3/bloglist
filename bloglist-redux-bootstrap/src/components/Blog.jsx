import { useState } from 'react'
import PropTypes from 'prop-types'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(updatedBlog))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      dispatch(removeBlog(blog.id))
  }

  return (
    <div className="blog">
      <div>
        {blog.title} — {blog.author}{' '}
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'hide' : 'view'}
        </button>
      </div>
      {isVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : null}</div>
          {blog.user && user.username === blog.user.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
