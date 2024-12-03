import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../contexts/NotificationContext'
import blogService from '../services/blogs'
import { useUserValue } from '../contexts/UserContext'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const queryClient = useQueryClient()
  const displayNotification = useNotification()
  const user = useUserValue()

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(blog => blog.id !== updatedBlog.id
          ? blog
          : updatedBlog
        )
      )
      displayNotification(`You liked '${updatedBlog.title}'`, 'confirmation')
    }
  })

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlogMutation.mutate({ id: blog.id, updatedBlog })
  }

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const id = blog.id
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== id))
      displayNotification(`You removed the blog '${blog.title}'`, 'confirmation')
    },
    onError: error => {
      displayNotification(error.response.data.error, 'error')
    }
  })

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      removeBlogMutation.mutate(blog.id)
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
}

export default Blog