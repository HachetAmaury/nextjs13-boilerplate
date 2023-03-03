import { expect, test } from 'vitest'
import { NextFont } from 'next/dist/compiled/@next/font'
import { render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'

import Home from '../src/app/page'

vi.mock('next/font/google', () => ({
  Inter: () =>
    ({
      className: 'inter',
      style: {},
    } as NextFont),
}))

test('home', () => {
  render(<Home />)
  const main = within(screen.getByRole('main'))
  expect(
    main.getByRole('heading', { level: 1, name: /welcome to Next.js!/i })
  ).toBeDefined()

  const vercelLogo = within(screen.getByRole('img', { name: /Vercel Logo/i }))
  expect(vercelLogo).toBeDefined()

  const nextJsLogo = within(screen.getByRole('img', { name: /Next.js Logo/i }))
  expect(nextJsLogo).toBeDefined()
})
