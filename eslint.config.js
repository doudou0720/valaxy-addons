import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'node_modules',
    'dist',
    '.output',
    '.changeset',
    'pnpm-lock.yaml',
  ],
}, {
  files: ['**/*.md'],
  rules: {
    'style/no-trailing-spaces': 'off',
  },
})
