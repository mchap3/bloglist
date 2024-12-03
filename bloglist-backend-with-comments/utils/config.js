require('dotenv').config()

const mongoUrl =
  process.env.NODE_ENV !== 'test'
    ? process.env.MONGODB_URL
    : process.env.TEST_MONGODB_URL
const PORT = process.env.PORT
const SECRET = process.env.SECRET

module.exports = {
  mongoUrl,
  PORT,
  SECRET,
}
