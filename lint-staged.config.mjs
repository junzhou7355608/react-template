const config = {
  '*.{js,mjs,cjs,jsx,ts,tsx}': [
    'eslint --fix --max-warnings 0 --no-warn-ignored',
    'prettier --write',
  ],
  '*.{css,scss,less,html,json,jsonc,json5,yaml,yml,md,mdx,graphql,gql}':
    'prettier --write',
};

export default config;
