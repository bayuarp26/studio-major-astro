<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Studio Major - Astro Project

This is an Astro application migrated from Next.js. 

## Project Structure
- Use Astro components (`.astro`) for pages and layouts
- Use React components (`.tsx`) for interactive components
- Use TypeScript for type safety
- Use Tailwind CSS for styling

## Migration Guidelines
- Convert Next.js pages to Astro pages in `src/pages/`
- Convert React components to either Astro components or keep as React with `client:` directives
- Use Astro's file-based routing instead of Next.js routing
- Replace Next.js Image component with Astro's optimized images
- Use Astro's built-in CSS support instead of CSS modules

## Best Practices
- Use `client:load` for interactive React components
- Use `client:idle` for components that can load after page load
- Use `client:visible` for components that should load when visible
- Prefer Astro components for static content
- Use React components only when interactivity is needed
