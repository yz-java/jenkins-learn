const fetch = require('node-fetch')
const api = require('../../..')

const apiPort = Math.round(Math.random() * 65535)
const baseURL = `http://localhost:${apiPort}/api/v1`

const db = require('../../../utils/db')
let dbConnection
const dbTestUtils = require('../../utils')

beforeAll(async () => {
  await api.listen(apiPort)
  dbConnection = await db()
})

beforeEach(async () => {
  await dbTestUtils.setUpDatabase()
})

afterEach(async () => {
  await dbTestUtils.clearDatabase()
})

afterAll(async () => {
  await api.close()
  await dbConnection.disconnect()
})

describe('Bookstore API - get Auth Bookstore', () => {
  test('Get /api/v1/bookstores/auth', async () => {
    const cookie = await dbTestUtils.getLogingUserCookies(baseURL)

    const response = await (
      await fetch(`${baseURL}/bookstores/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie
        }
      })
    ).json()

    expect(response).toMatchObject({
      status: 'success',
      code: 200,
      message: 'Bookstore with all its books.',
      errors: null
    })

    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length > 0).toBe(true)
  })
})

afterAll(async () => {
  await api.close()
  await dbConnection.disconnect()
})
