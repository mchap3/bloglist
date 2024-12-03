const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there are users present in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash
    })
    await user.save()
  })

  test('user creation succeeds with fresh username and valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'Test Name',
      password: 'pass111'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('user creation fails with missing/invalid username', async () => {
    const usersAtStart = await helper.usersInDb()

    const userMissingUsername = {
      name: 'Test Name',
      password: 'pass111'
    }

    let result = await api
      .post('/api/users')
      .send(userMissingUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('User validation failed'))

    const userInvalidUsername = {
      username: 'AB',
      name: 'Test Name',
      password: 'pass111'
    }

    result = await api
      .post('/api/users')
      .send(userInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('User validation failed'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('user creation fails with repeated username', async () => {
    const usersAtStart = await helper.usersInDb()

    const userRepeatedUsername = {
      username: 'root',
      name: 'Test Name',
      password: 'pass111'
    }

    let result = await api
      .post('/api/users')
      .send(userRepeatedUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    assert(result.body.error.includes('expected username to be unique'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('user creation fails with missing/invalid password', async () => {
    const usersAtStart = await helper.usersInDb()

    const userMissingPassword = {
      username: 'user1',
      name: 'Test Name',
    }

    let result = await api
      .post('/api/users')
      .send(userMissingPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('expected password with at least 3 characters'))

    const userInvalidPassword = {
      username: 'user1',
      name: 'Test Name',
      password: 'pw'
    }

    result = await api
      .post('/api/users')
      .send(userInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('expected password with at least 3 characters'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})