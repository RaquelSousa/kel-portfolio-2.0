# Kel Portfolio 2.0

A modern portfolio website built with React 19, TypeScript, and Vite, featuring a beautiful UI with Tailwind CSS and Radix UI components.
It's optimized for Accessibility, SEO, is fully responsive, and even has built in analytics. Component and E2E testing also implemented.

## 🚀 Quick Start

### Prerequisites

1. **Clone**

```bash
git clone <repository-url>
cd kel-portfolio-2.0
````

2. **Install dependencies**

```bash
bun install
````

3. **Set up environment variables**

   ```bash
   # Copy the environment template
   cp env.template .env

   # Edit .env with your EmailJS credentials
   # VITE_EMAILJS_SERVICE_ID=your_service_id_here
   # VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   # VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

The application will be available at `http://localhost:8080`

## 📝 Environment Variables

This project uses EmailJS for contact form functionality. You'll need to:

1. Create an account at [EmailJS](https://emailjs.com/)
2. Set up a service and email template
3. Copy your credentials to the `.env` file

| Variable                   | Description              |
| -------------------------- | ------------------------ |
| `VITE_EMAILJS_SERVICE_ID`  | Your EmailJS service ID  |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY`  | Your EmailJS public key  |

## 🛠️ Available Scripts

### Development

- `bun run dev` - Start development server
- `bun run preview` - Preview production build locally

### Building

- `bun run build` - Build for production
- `bun run build:dev` - Build in development mode
- `bun run build:analyze` - Build and analyze bundle size
- `bun run build:stats` - Build with verbose reporter

### Testing

- `bun run test` - Run unit tests
- `bun run test:ui` - Run tests with UI
- `bun run test:run` - Run tests once
- `bun run test:coverage` - Run tests with coverage report

### End-to-End Testing

- `bun run test:e2e` - Run Cypress tests headlessly
- `bun run test:e2e:open` - Open Cypress test runner

### Code Quality

- `bun run lint` - Run ESLint
- `bun run seo:audit` - Run SEO audit
- `bun run audit:lighthouse` - Lighthouse audit (perf/a11y/SEO) against the running dev server
- `bun run audit:a11y` - axe-core accessibility audit against the running dev server
- `bun run audit:deadcode` - Fallow: find unused files/exports/dependencies
- `bun run audit:health` - Fallow: codebase health & complexity score

### Bundle Analysis

- `bun run bundle:analyze` - Analyze bundle composition
- `bun run preview:size` - Show built asset sizes

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom built component library based on Radix UI (shadcn/ui)
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query
- **Testing**: Vitest + Testing Library + Cypress

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries and configurations
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── data/          # Static data and constants
└── test/          # Test utilities and setup
```

## 🚀 Deployment

1. **Build the project**

   ```bash
   bun run build
   ```

2. **Deploy the `dist` folder** to your hosting platform of choice (Vercel, Netlify, etc.)

## 🤝 Development Guidelines

- Follow React 19 best practices
- Use TypeScript for type safety
- Maintain component modularity
- Write tests for critical functionality
- Follow the established linting rules

## 📄 License

This project is private and proprietary.
