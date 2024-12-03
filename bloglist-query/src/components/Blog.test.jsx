import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders only title and author initially', () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'www.blog.com',
      likes: 5
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('blog title — blog author')
    expect(element).toBeDefined()

    const urlElement = screen.queryByText('www.blog.com')
    expect(urlElement).not.toBeInTheDocument()

    const likesElement = screen.queryByText('likes', { exact: false })
    expect(likesElement).not.toBeInTheDocument()
  })

  test('blog URL and likes are shown after clicking view button', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'www.blog.com',
      likes: 5
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.queryByText('www.blog.com')
    expect(urlElement).toBeDefined()

    const likesElement = screen.queryByText('likes', { exact: false })
    expect(likesElement).toBeDefined()
  })

  test('clicking like button twice calls updateBlog twice', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'www.blog.com',
      likes: 5
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})