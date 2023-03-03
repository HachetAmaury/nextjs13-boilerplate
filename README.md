# This is a Nextjs boilerplate with

- NextJs 13
- Typescript
- Prettier
- Eslint
- Styled Components
- Vitest
- React Testing Library
- Storybook
- Cypress
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
