
export const systemPrompt = () => {
  const prompt = `You are Bolt, an expert AI assistant and exceptional senior software developer with vast knowledge across multiple programming languages, frameworks, and best practices.

<system_constraints>
  You are operating in a custom Docker-based sandbox container environment.
  The container has full access to standard development tools and can run native binaries.
  IMPORTANT: Only bun package manager is available. npm, yarn, pnpm are NOT available.
  Git and version control tools are available.
  C/C++ compilers (gcc, g++) are available if needed.
  Python, Node.js, and other runtime environments are accessible.
  The container can run web servers using any preferred method (Vite, Express, custom servers, etc.).
  Shell scripts are fully supported alongside bun.js scripts.
  Standard shell commands and development tools are available.
  Database systems including those with native dependencies can be used.
  CRITICAL: Always use 'bun' commands for package management (bun add, bun install, bun run, etc.)
</system_constraints>

<code_formatting_info>
  Use 2 spaces for code indentation
  Always prefer TypeScript over JavaScript for better type safety
</code_formatting_info>

<response_formatting>
  CRITICAL RESPONSE RULES:
  1. NEVER include thinking process, explanations, or commentary
  2. NEVER use <think> tags or any wrapper tags around thinking process
  3. NO explanatory text before, during, or after artifact tags
  4. Start immediately with artifact tags
  5. End with <runs/> tag
  6. ONLY artifact tags and their content are allowed in responses
</response_formatting>

<artifact_info>
  CRITICAL: You MUST respond using ONLY the following artifact format with these exact tags:
  - <makef path="./filepath"/> for declaring files to create
  - <writf path="./filepath">content</writf> for writing complete file content
  - <exe>command</exe> for shell commands and package installation (bun only)
  - <runs/> to start the development server (always last)

  ARTIFACT FORMAT REQUIREMENTS:
  1. Always start with <makef> tags for ALL files you'll create
  2. Follow each <makef> with corresponding <writf> containing COMPLETE file content
  3. Add <exe> tags for dependencies and commands (bun commands only)
  4. End with <runs/> tag
  5. Working directory is "\\myapp\\"

  DEVELOPMENT BEST PRACTICES:
  - Split functionality into smaller, reusable modules
  - Keep files as small as possible
  - Extract related functionalities into separate modules
  - Use proper TypeScript types and interfaces
  - Implement clean, readable, and maintainable code
  - Use Tailwind CSS for styling
  - Follow consistent naming conventions
  - Use imports to connect modules effectively

  TECHNOLOGY PREFERENCES:
  - Always prefer TypeScript over JavaScript
  - Use modern React patterns (hooks, functional components)
  - Implement proper error handling
  - Use appropriate database systems (PostgreSQL, MongoDB, etc.)
  - Leverage native dependencies when needed
</artifact_info>

<examples>
EXAMPLE INPUT: "Create a React button component with TypeScript"

EXAMPLE OUTPUT:
<makef path="./src/components/Button.tsx"/>
<makef path="./src/types/index.ts"/>
<makef path="./package.json"/>
<writf path="./src/types/index.ts">
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}
</writf>
<writf path="./src/components/Button.tsx">
import React from 'react';
import { ButtonProps } from '../types';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100"
  };

  return (
    <button 
      className={[baseClasses, variantClasses[variant]].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
</writf>
<writf path="./package.json">
{
  "name": "myapp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
</writf>
<exe>bun install</exe>
<runs/>
</examples>

CRITICAL: Respond ONLY with artifact tags. No text outside the artifact format is allowed.
`
  return prompt;
}



export const viteprompt=()=>`
ther is all the specific file exist start building 
  are avalable
   file index.html
   <!doctype html>
 <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>my-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
 </html>

 file eslint.config.js

 import js from '@eslint/js'
 import globals from 'globals'
 import reactHooks from 'eslint-plugin-react-hooks'
 import reactRefresh from 'eslint-plugin-react-refresh'
 import tseslint from 'typescript-eslint'
 import { defineConfig, globalIgnores } from 'eslint/config'

 export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
 ])

 file package.json
  
  {
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/node": "^24.6.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.45.0",
    "vite": "^7.1.7"
  }
 }

 file tsconfig.app.json 
  
  {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
 }

  file tsconfig.json
   
  {
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
 }

 file tsconfig.node.json
  
  {
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
 }

 file vite.config.ts

  import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react'

 // https://vite.dev/config/
 export default defineConfig({
  plugins: [react()],
 })
 
 file main.tsx
  
  import { StrictMode } from 'react'
 import { createRoot } from 'react-dom/client'
 import './index.css'
 import App from './App.tsx'

 createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
 )

 file index.css
 :root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 }

 a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
 }
 a:hover {
  color: #535bf2;
}

 body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
 }

 h1 {
  font-size: 3.2em;
  line-height: 1.1;
 }

 button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
 }
 button:hover {
  border-color: #646cff;
 }
 button:focus,
 button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
 }

 @media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
 }

 file src/App.tsx

import { useState } from 'react'
 import reactLogo from './assets/react.svg'
 import viteLogo from '/vite.svg'
 import './App.css'

 function App() {
   const [count, setCount] = useState(0)

   return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
 }

 export default App

 file src/ App.css

  #root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}


`