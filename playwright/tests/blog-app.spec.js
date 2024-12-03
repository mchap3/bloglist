const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'superuser',
        username: 'root',
        password: 'pass1234'
      }
    })
    
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'login' })
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'pass1234')

      await expect(page.getByText('Logged in as', { exact: false })).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrongpassword')

      await expect(page.getByText('Logged in as', { exact: false })).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'pass1234')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog created by playwright', 'playwright', 'www.blogs.test')

      await expect(page.getByText('blog created by playwright — playwright')).toBeVisible()
    })
    
    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'blog created by playwright', 'playwright', 'www.blogs.test')
      })
  
      test('the blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('the blog can be deleted by its creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Blog successfully removed')).toBeVisible()
        await expect(page.getByText('blog created by playwright — playwright')).not.toBeVisible()
      })

      test('remove button is not available to another user', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'newuser',
            username: 'newuser',
            password: 'password'
          }
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'newuser', 'password')
        await page.getByRole('button', { name: 'view' }).click()
        
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'blog with 3 likes', 'author1', 'url1', 3)
        await createBlog(page, 'blog with 2 likes', 'author2', 'url2', 2)
        await createBlog(page, 'blog with 4 likes', 'author3', 'url3', 4)
      })

      test('blogs are displayed in order of most liked', async ({ page }) => {
        const blogs = await page.getByText('likes:', { exact: false }).allTextContents()
        const numLikes = blogs.map(blog => parseInt(/likes: (\d)/.exec(blog)[1]))
        
        expect(numLikes).toStrictEqual([4, 3, 2])
        
      })
    })
  })
})