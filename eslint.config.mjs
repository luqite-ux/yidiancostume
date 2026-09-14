import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', '.playwright-cli/**', 'deliverables/**']),
  {
    files: ['components/ui/carousel.tsx', 'components/ui/sidebar.tsx', 'components/ui/use-mobile.tsx', 'hooks/use-mobile.ts'],
    rules: {
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
