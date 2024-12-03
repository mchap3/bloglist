import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('URL:')

  await user.type(titleInput, 'blog title')
  await user.type(authorInput, 'blog author')
  await user.type(urlInput, 'www.blog.com')

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('blog author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.blog.com')
})
