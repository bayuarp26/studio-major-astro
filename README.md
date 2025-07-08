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

---

## ⚠️ Common Errors & Troubleshooting

### 🔐 Authentication & Database Issues

#### 1. MongoDB Connection Error
**Error**: `MONGODB_URI is not defined` or `MongoDB connection failed`

**Solutions**:
```bash
# 1. Check if .env file exists and contains correct MongoDB URI
cat .env

# 2. Restart development server to reload environment variables
npm run dev

# 3. Verify MongoDB URI format:
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

#### 2. Admin Login Issues
**Error**: `Invalid credentials` or login form not working

**Solutions**:
```bash
# Check available admin users in database
node -e "
const { MongoClient } = require('mongodb');
async function checkUsers() {
  const client = new MongoClient(process.env.MONGODB_URI || 'your-uri');
  await client.connect();
  const users = await client.db('portfolioDB').collection('profil_settings').find({}).toArray();
  console.log('Available users:', users.map(u => ({username: u.username, hasPassword: !!u.password})));
  await client.close();
}
checkUsers().catch(console.error);
"
```

**Default Admin Credentials**:
- Username: `admin`
- Password: `admin123`
- Alternative: `085156453246` (check database for password)

#### 3. JWT Token Issues
**Error**: `Invalid token` or session expires immediately

**Solutions**:
```bash
# 1. Check JWT_SECRET in .env
grep JWT_SECRET .env

# 2. Clear browser cookies and try login again
# 3. Regenerate JWT_SECRET if needed:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 🚀 Development Server Issues

#### 1. Port Already in Use
**Error**: `Port 3000 is in use, trying another one...`

**Solutions**:
```bash
# Kill processes using the port
npx kill-port 3000

# Or use a specific port
npm run dev -- --port 3001
```

#### 2. Build Errors
**Error**: TypeScript or build compilation errors

**Solutions**:
```bash
# 1. Clear Astro cache
rm -rf .astro

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Check TypeScript types
npm run astro check
```

#### 3. Hydration Mismatch
**Error**: React hydration mismatch warnings

**Solutions**:
```astro
<!-- Use appropriate client directive -->
<Component client:load />    <!-- For critical components -->
<Component client:idle />    <!-- For non-critical components -->
<Component client:visible /> <!-- For below-the-fold components -->
```

### 📱 Styling & UI Issues

#### 1. Tailwind CSS Not Working
**Error**: Tailwind classes not applied

**Solutions**:
```bash
# 1. Check if Tailwind is properly configured
cat tailwind.config.mjs

# 2. Restart dev server
npm run dev

# 3. Verify import in main CSS file
grep "@tailwind" src/styles/global.css
```

#### 2. Component Styling Issues
**Error**: Components not rendering correctly

**Solutions**:
```astro
---
// Import global styles in layout
import '../styles/global.css';
---
```

### 🌐 Deployment Issues

#### 1. Environment Variables in Production
**Error**: Environment variables not available in production

**Solutions**:
```bash
# 1. Ensure environment variables are set in deployment platform
# 2. Check astro.config.mjs for proper env configuration
# 3. For Vercel: Add variables in dashboard
# 4. For Netlify: Add variables in site settings
```

#### 2. Database Connection in Production
**Error**: Cannot connect to MongoDB in production

**Solutions**:
```bash
# 1. Whitelist production IP in MongoDB Atlas
# 2. Check connection string format
# 3. Ensure database exists and collections are created
```

### 🔧 Quick Fixes

```bash
# Complete reset (nuclear option)
rm -rf node_modules .astro dist
npm install
npm run dev

# Environment check
node -e "console.log('MongoDB:', !!process.env.MONGODB_URI); console.log('JWT:', !!process.env.JWT_SECRET);"

# Database health check
npm run check-db  # Custom script if added

# Clear browser data
# - Clear cookies for localhost
# - Hard refresh (Ctrl+Shift+R)
# - Open incognito/private window
```

### 📞 Getting Help

If you encounter issues not covered here:

1. **Check logs**: Browser console and terminal output
2. **Search issues**: [GitHub Issues](https://github.com/bayuarp26/studio-major-astro/issues)
3. **Create issue**: Include error messages, environment details, and steps to reproduce
4. **Discord/Community**: Astro Discord server for framework-specific issues

---

## 🗃️ Database Schema

### Collections Structure
```javascript
// portfolioDB database collections:
- profil_settings    // Admin users and profile settings
- content           // Main portfolio content
- projects          // Project portfolio items  
- education         // Education history
- certificates      // Certifications and achievements
- soft_skills       // Soft skills list
- hard_skills       // Technical skills list
- software_skills   // Software/tools with icons
```

### Sample Admin User Creation
```javascript
// Add new admin user to database
{
  username: "admin",
  password: "$2a$10$hashedpassword..." // bcrypt hash of "admin123"
}
```

---

## 🔒 Security Notes

- ✅ `.env` file is gitignored (never commit sensitive data)
- ✅ JWT tokens expire after 7 days
- ✅ Admin routes protected by middleware
- ✅ Password hashing with bcrypt
- ⚠️ Change default admin credentials in production
- ⚠️ Use strong JWT_SECRET in production
- ⚠️ Enable MongoDB Atlas IP whitelist in production

---

# Studio Major Astro

Portfolio application with admin dashboard, migrated from Next.js to Astro with MongoDB integration.
