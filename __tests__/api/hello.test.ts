import request from 'supertest'
import { expect, test } from 'vitest'

test('GET /hello', async () => {
  const response = await request('http://localhost:3000').get('/api/hello')

  expect(response.status).toEqual(200)

  const text = await response.text
  expect(text).toBe('Hello, Next.js!')
})
