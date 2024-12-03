const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return prev && prev.likes > current.likes ? prev : current
  }

  const favorite = blogs.reduce(reducer, null)
  return blogs.length === 0
    ? null
    : {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
      }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // count number of blogs for each author
  const counts = blogs.reduce((acc, { author }) => {
    acc[author] = acc[author] ? acc[author] + 1 : 1
    return acc
  }, {})

  // find author with max number of blogs
  const [author, numBlogs] = Object.entries(counts).reduce((acc, curr) =>
    acc[1] < curr[1] ? curr : acc
  )
  return { author: author, blogs: numBlogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // tally number of likes for each author
  const counts = blogs.reduce((acc, { author, likes }) => {
    acc[author] = acc[author] ? acc[author] + likes : likes
    return acc
  }, {})

  // find author with max number of likes
  const [author, numLikes] = Object.entries(counts).reduce((acc, curr) =>
    acc[1] < curr[1] ? curr : acc
  )
  return { author: author, likes: numLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
