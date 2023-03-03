# This is a Nextjs boilerplate with

- NextJs 13
- Typescript
- Prettier
- Eslint
- Styled Components
- Vitest
- React Testing Library
- Cypress
- Storybook
- Material UI

## 1 - NextJs 13 & Typescript & Eslint

```bash
    npx create-next-app --ts
```

## 2 - Prettier

### Install prettier

```bash
yarn add prettier -D
```

### Create .prettierrc.js file

```js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
}
```

## 3 - Styled Components

```bash
    yarn add styled-components
```

```bash
    yarn add -D @swc/plugin-styled-components @swc/core @types/styled-components
```

### Create .swcrc file

```js
{
  "jsc": {
    "experimental": {
      "plugins": [
        [
          "@swc/plugin-styled-components",
          {
            "displayName": true,
            "ssr": true
          }
        ]
      ]
    }
  }
}
```

### Create a page.styled.tsx file

```tsx
'use client'

import styled from 'styled-components'

export const StyledTitle = styled.h1`
  color: red;
`
```

### Import the styled component in the page

```tsx
import { StyledTitle } from './page.styled'


export default function Home() {
    (...)
    return (
        (...)
        <StyledTitle className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </StyledTitle>
       (...)
  )
}
```

It is important to note that since with Next 13 all page are server components, the styled component must be defined in a separate file, with the 'use client' directive at the top of the file. Otherwise, the styled component will be rendered on the server side and will not work.

## 4 - Vitest & React Testing Library

### Install Vitest & React Testing Library

```bash
yarn add -D @testing-library/react @types/node @types/react vitest @vitejs/plugin-react jsdom
```

Edit the package.json file

```json
{
  "scripts": {
    (...)
    "test": "vitest"
  }
}
```

Create a vitest.config.ts file

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

### Create a \_\_tests\_\_/Home.test.tsx file

```js
import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../src/app/page'
import { NextFont } from 'next/dist/compiled/@next/font'

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

```

Run the test

```bash
yarn test
```

```bash

 RERUN  __tests__/Home.test.tsx x27

 ✓ __tests__/Home.test.tsx (1)

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  14:43:21
   Duration  266ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

## 5 - Cypress

### Install Cypress

```bash
yarn add -D cypress start-server-and-test
```

Edit package.json file

```json
{
  "scripts": {
    (...)
    "e2e": "start-server-and-test dev http://localhost:3000 \"cypress open --e2e\"",
    "e2e:headless": "start-server-and-test dev http://localhost:3000 \"cypress run --e2e\"",
    "component": "cypress open --component",
    "component:headless": "cypress run --component"
  }
}
```

Run the cypress command to initialize the cypress files for e2e and component testing

```bash
yarn cypress:open
```

### Edit cypress.config.ts file

```js
import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: '**/cypress/__tests__/*.spec.tsx',
    viewportHeight: 1280,
    viewportWidth: 800,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/cypress/e2e/*.spec.ts',
  },
  video: false,
})
```

### Create a /src/app/about/page.tsx file

```js
import Link from 'next/link'

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <Link href="/">Homepage</Link>
    </div>
  )
}
```

### Edit src/app/page.tsx file

```js
import Link from 'next/link'

(...)

export default function Home() {
  return (
    (...)
    <Link href="/about">About</Link>
    (...)
  )
}
```

### e2E testing : Create a cypress/e2e/navigation.spec.ts file

```js
describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/about')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About Page')
  })

  it('should navigate to the home page', () => {
    cy.visit('http://localhost:3000/about')

    // Find a link with an href attribute containing "/" and click it
    cy.get('a[href*="/"]').click()

    // The new url should include "/"
    cy.url().should('include', '/')

    // The new page should contain an h1 with "Home page"
    cy.get('h1').contains('Welcome to Next.js!')
  })
})

export {}
```

### Run the e2e tests

```bash
yarn e2e:headless
```

```bash
  (Run Finished)
       Spec                         Tests  Passing  Failing  Pending  Skipped
  ┌───────────────────────────────────────────────────────────────────────────┐
  │ ✔  navigation.spec.ts  00:03     2        2        -        -        -    │
  └───────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!   00:03     2        2        -        -        -

✨  Done in 12.32s.
```

### Components testing

Create a cypress/\_\_tests\_\_/pageAbout.spec.tsx file

```js
import About from '../../src/app/about/page'
import React from 'react'

describe('<About />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<About />)

    // see: https://on.cypress.io/interacting-with-elements

    // find the link to the homepage
    cy.contains('a', 'Homepage').should('have.attr', 'href', '/')

    // find the heading
    cy.contains('h1', 'About Page').should('be.visible')
  })
})
```

Create a cypress/\_\_tests\_\_/pageHome.spec.tsx file

```js
import React from 'react'
import Home from '../../src/app/page'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />)

    // see: https://on.cypress.io/interacting-with-elements

    // find the link to the about page
    cy.contains('a', 'About').should('have.attr', 'href', '/about')

    // find the heading
    cy.contains('h1', 'Welcome to Next.js!').should('be.visible')
  })
})
```

### Run the component tests

```bash
yarn component:headless
```

```bash
  (Run Finished)
       Spec                               Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  pageAbout.spec.tsx     114ms        1        1        -        -        -   │
  ├────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  pageHome.spec.tsx      154ms        1        1        -        -        -   │
  └────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed       268ms        2        2        -        -        -

✨  Done in 8.57s.
```

## 6 - Storybook

```bash
npx storybook@next init
```
