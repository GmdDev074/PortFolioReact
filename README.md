# Android Developer Portfolio

A modern, responsive portfolio website showcasing Android development projects and skills. Built with React, TypeScript, and Vite, featuring smooth animations, multi-language support, and a dark/light theme.

## 🚀 Tech Stack

### Frontend Framework & Build Tools
- **React 18.3.1** - UI library
- **TypeScript 5.5.4** - Type-safe JavaScript
- **Vite 7.3.1** - Fast build tool and dev server
- **Wouter 3.3.0** - Lightweight routing

### Styling & UI
- **Tailwind CSS 3.4.13** - Utility-first CSS framework
- **Tailwind Animate** - Animation utilities
- **Framer Motion 11.5.4** - Animation library
- **Lucide React 0.441.0** - Icon library

### State Management & Data Fetching
- **TanStack React Query 5.56.2** - Server state management
- **React Context API** - Global state (Theme, Language)

### Utilities
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 2.5.4** - Merge Tailwind classes

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS transformation

## 📁 Project Structure

```
.
├── public/                 # Static assets
│   ├── project_images/    # Project showcase images
│   └── resume/            # Resume PDF file
├── src/
│   ├── components/        # React components
│   │   ├── layout/       # Layout components
│   │   │   ├── navbar.tsx    # Navigation bar
│   │   │   └── footer.tsx    # Footer component
│   │   ├── sections/     # Page sections
│   │   │   ├── hero.tsx          # Hero/intro section
│   │   │   ├── skills.tsx        # Skills & tools section
│   │   │   ├── projects.tsx      # Projects showcase
│   │   │   ├── process.tsx       # Development workflow
│   │   │   ├── reviews.tsx       # Client testimonials
│   │   │   ├── about.tsx         # About/Why Me section
│   │   │   └── contact.tsx       # Contact form
│   │   └── ui/           # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── scroll-to-top.tsx
│   │       ├── toaster.tsx
│   │       └── tooltip.tsx
│   ├── contexts/         # React Context providers
│   │   ├── theme-context.tsx     # Dark/light theme
│   │   └── language-context.tsx  # Multi-language support
│   ├── lib/              # Utilities & constants
│   │   ├── constants.ts          # App-wide constants
│   │   ├── utils.ts              # Helper functions
│   │   ├── queryClient.ts        # React Query config
│   │   └── deviceInfo.ts         # Device detection
│   ├── pages/            # Route pages
│   │   ├── home.tsx              # Home page
│   │   ├── project-detail.tsx    # Project detail page
│   │   ├── resume.tsx            # Resume viewer
│   │   └── not-found.tsx         # 404 page
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
├── vite.config.ts        # Vite config
└── postcss.config.js     # PostCSS config
```

## ✨ Features

### 🎨 UI/UX Features
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Smooth Animations** - Framer Motion powered scroll-triggered animations
- **Horizontal Scrolling** - Projects and tools displayed in scrollable carousels
- **Hover Effects** - Interactive card animations without clipping
- **Scroll-to-Top Button** - Appears after scrolling down

### 🌍 Internationalization (i18n)
- **15 Languages Supported**:
  - English, Chinese, German, Russian, Arabic
  - Spanish, French, Portuguese, Japanese, Korean
  - Italian, Turkish, Hindi, Urdu, Dutch
- **Language Persistence** - Saves preference to localStorage
- **Flag Icons** - Visual language selector
- **Complete Translation** - All UI text translated (except programming terms)

### 📱 Sections

1. **Hero Section**
   - Introduction and tagline
   - Call-to-action buttons
   - Animated background decorations

2. **Skills Section**
   - Technology stack cards
   - Tools I Use (horizontal scrolling)
   - GitHub contribution calendar

3. **Projects Section**
   - 8 featured projects
   - Horizontal scrolling carousel
   - Navigation arrows
   - Project detail pages

4. **Process Section**
   - Development workflow steps
   - 4-step process visualization

5. **Reviews Section**
   - Client testimonials
   - Auto-scrolling carousel
   - Avatar generation

6. **About Section (Why Me)**
   - Professional statistics
   - Why choose me features
   - Animated counters

7. **Contact Section**
   - Contact form
   - Social links
   - Email integration ready

### 🎯 Additional Features
- **Resume Viewer** - Dedicated page for PDF resume viewing/download
- **Project Detail Pages** - Full project descriptions and features
- **Smooth Scrolling** - Hash-based navigation with offset for fixed navbar
- **SEO Optimized** - Meta tags and semantic HTML
- **TypeScript** - Full type safety throughout the application
- **Performance** - Optimized bundle size and lazy loading

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PortFolioReact
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## 📝 Configuration

### Adding Projects

Edit `src/lib/constants.ts` to add or modify projects:

```typescript
PROJECTS: [
  {
    id: 'project-id',
    title: 'Project Title',
    shortDescription: 'Brief description for main page',
    description: 'Full description for detail page',
    image: '/project_images/image.jpg',
    techStack: ['Tech1', 'Tech2'],
    category: 'Category',
    githubUrl: 'https://github.com/...',
    playStoreUrl: 'https://play.google.com/...',
    features: ['Feature 1', 'Feature 2']
  }
]
```

### Adding Translations

Edit `src/contexts/language-context.tsx` to add new translations. Add your key-value pairs to the `translations` object for each language.

### Theme Customization

Edit `src/index.css` for CSS variables and `tailwind.config.js` for Tailwind theme customization.

## 🚀 Deployment

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag and drop the `dist/` folder to Netlify
   - Or connect your Git repository for auto-deployment

3. **Configure Build Settings** (if using Git)
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel

```bash
npm run build
vercel deploy dist
```

### Other Platforms

The `dist/` folder contains static files that can be deployed to any static hosting service:
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- Any web server

## 📦 Static Assets

All static assets should be placed in the `public/` folder:
- Images: `public/project_images/`
- PDFs: `public/resume/`
- Other assets: `public/[folder-name]/`

These will be copied to the root of `dist/` during build.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Decisions

- **Wouter over React Router**: Lighter weight routing for static site
- **Tailwind CSS**: Utility-first approach for rapid styling
- **Framer Motion**: Smooth, performant animations
- **Context API**: Simple global state without Redux
- **TypeScript**: Type safety and better DX
- **Vite**: Fast HMR and optimized builds

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License

```
MIT License

Copyright (c) 2024 Muhammad Salman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👤 Author

**Muhammad Salman**
- Portfolio: [https://salmandev-portfolio.netlify.app](https://salmandev-portfolio.netlify.app)
- GitHub: [https://github.com/GmdDev074](https://github.com/GmdDev074)
- LinkedIn: [https://www.linkedin.com/in/muhammad-salman-5672a0203/](https://www.linkedin.com/in/muhammad-salman-5672a0203/)

---

Built with ❤️ using React, TypeScript, and Vite
