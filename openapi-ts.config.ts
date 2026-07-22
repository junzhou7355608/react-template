import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './api.yaml',
  output: {
    path: './src/api',
  },
  plugins: [
    {
      name: 'zod',
      requests: true,
      responses: true,
      definitions: true,
    },
    '@hey-api/schemas',
    '@hey-api/client-axios',
    {
      name: '@hey-api/sdk',
      validator: true,
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    '@tanstack/react-query',
  ],
});
