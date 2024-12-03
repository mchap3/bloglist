const loginWith = async (page, username, password) => {
  await page.getByRole('textbox', { name: 'Username' }).fill(username)
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url, likes = 0) => {
await page.getByRole('button', { name: 'new blog' }).click()
await page.getByRole('textbox', { name: 'title' }).fill(title)
await page.getByRole('textbox', { name: 'author' }).fill(author)
await page.getByRole('textbox', { name: 'url' }).fill(url)
await page.getByRole('button', { name: 'create' }).click()

const blogDiv = await page.locator('.blog').filter({ hasText: new RegExp(`${title} — ${author}`) })

if (likes) {
  await blogDiv.getByRole('button', { name: 'view' }).click()
  for (let i = 0; i < likes; i++ ) {
    await blogDiv.getByRole('button', { name: 'like' }).click()
    await blogDiv.getByText(`likes: ${i+1}`, {exact: false}).waitFor()
  }
}
}

module.exports = { loginWith, createBlog }