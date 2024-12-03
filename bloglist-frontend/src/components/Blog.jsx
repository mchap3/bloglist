import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      removeBlog(blog.id)
  }

  return (
    <div className="blog">
      <div>
        {blog.title} — {blog.author} <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'hide' : 'view'}
        </button>
      </div>
      {isVisible && (
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes: {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>
            {blog.user ? blog.user.name : null}
          </div>
          {blog.user
            && (user.username === blog.user.username)
            && <button onClick={handleRemove}>remove</button>
          }
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog