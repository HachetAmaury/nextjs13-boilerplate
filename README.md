# This is a Nextjs boilerplate with

- NextJs 13
- Typescript
- Prettier
- Eslint
- Styled Components
- Material UI
- Vitest
- React Testing Library
- Storybook
- Cypress

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
