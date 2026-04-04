//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  react.configs.flat.recommended,
  ...tanstackConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
    plugins: {
      'react-hooks': reactHooks,
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js', 'src/components/ui/*'],
  },
]
