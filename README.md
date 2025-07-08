# Studio Major - Astro Application

A modern web application migrated from Next.js to Astro, featuring React integration and Tailwind CSS styling.

## 🚀 Features

- **Astro Framework**: Static site generation with zero-config optimizations
- **React Integration**: Interactive components with client-side hydration
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Full type safety across the application
- **File-based Routing**: Intuitive routing system based on file structure

## 📁 Project Structure

```text
/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components (.tsx)
│   ├── layouts/          # Astro layout components
│   ├── pages/            # Astro pages (routes)
│   └── styles/           # Global CSS files
├── .github/
│   └── copilot-instructions.md  # Copilot customization
├── astro.config.mjs       # Astro configuration
└── package.json
```

## �️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 Migration from Next.js

This project has been migrated from Next.js to Astro. Key changes include:

- **Pages**: Next.js pages converted to Astro pages in `src/pages/`
- **Components**: React components maintained with `client:` directives
- **Routing**: File-based routing (similar to Next.js but with `.astro` extensions)
- **Styling**: Tailwind CSS integration for consistent styling
- **Performance**: Static generation by default with selective hydration

## 🧩 Component Usage

### React Components with Hydration

```astro
---
import Button from '../components/Button.tsx';
---

<!-- Use client:load for immediate hydration -->
<Button client:load>Click me</Button>

<!-- Use client:idle for lazy hydration -->
<Button client:idle>Lazy button</Button>

<!-- Use client:visible for viewport-based hydration -->
<Button client:visible>Visible button</Button>
```

### Astro Components

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="My Page">
  <h1>Welcome to Astro!</h1>
</Layout>
```

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
