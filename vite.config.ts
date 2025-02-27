import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';


// List of aliases to create for the project folders.
// This will allow to import modules using the alias
// instead of the relative path.
const aliases = [
  'assets',
  'api',
  'components',
  'config',
  'constants',
  'hooks',
  'layout',
  'pages',
  'UI',
  'interfaces',
  'services',
];

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: aliases.reduce(
      (acc, alias) => ({
        ...acc,
        [alias]: path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          `src/${alias}`,
        ),
      }),
      {},
    ),
  },
});
