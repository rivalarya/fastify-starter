import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      'indent': ['error', 2],
      "@typescript-eslint/no-unused-vars": "warn",
      'semi': ['error', 'never'],
    }
  }
)