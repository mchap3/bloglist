import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className='blog' key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} — {blog.author}</Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList