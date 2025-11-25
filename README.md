# 🎬 Movie Ticket Booking SPA

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=for-the-badge&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, feature-rich Single Page Application (SPA) for booking movie tickets, built with cutting-edge web technologies. This project showcases a premium user interface, seamless booking workflows, efficient state management, and production-ready code patterns. Perfect for learning full-stack development with Next.js and Supabase.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Authentication Flow](#authentication-flow)
- [Booking Flow](#booking-flow)
- [Styling & Theme](#styling--theme)
- [Performance Optimizations](#performance-optimizations)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This Movie Ticket Booking SPA is a full-featured web application that allows users to:
- Browse available movies with detailed information
- Create an account and manage their profile
- Select showtimes and seats for movie screenings
- Add food and beverage items to their order
- Complete a booking with payment simulation
- View their booking history

The application is built with modern web standards, emphasizing performance, accessibility, and user experience. It's an excellent reference project for developers looking to understand contemporary web development practices.

---

## ✨ Features

### Core Features

- **🎥 Movie Browsing & Discovery**
  - Browse "Now Showing" and "Coming Soon" movies
  - High-quality poster images with ratings
  - Genre-based filtering
  - Search functionality across movie catalog
  - Movie details page with synopsis, cast, and runtime information
  - Hero carousel showcasing trending movies

- **🔐 Secure Authentication**
  - User sign-up with email verification
  - Secure login system
  - Session management with Supabase Auth
  - Password reset functionality
  - User profile management
  - OAuth integration ready

- **🎫 Interactive Seat Selection**
  - Visual seat map with responsive grid layout
  - Real-time seat status (Available, Booked, Selected)
  - Color-coded seat indicators
  - Selected seat summary panel
  - Price calculation based on selected seats
  - Screen visualization for cinema layout

- **🛒 Complete Booking Flow**
  - Multi-step booking wizard
  - Movie selection → Showtime → Seats → Add-ons → Payment
  - Food & beverage options with pricing
  - Order summary with itemized breakdown
  - Booking confirmation with ticket details
  - Booking history with download options

- **💳 Payment Integration**
  - Simulated payment gateway
  - Multiple payment method support (Credit Card, UPI, Digital Wallets)
  - Order total calculation with taxes
  - Payment receipt generation

- **📱 Responsive Design**
  - Mobile-first approach
  - Desktop, tablet, and mobile optimization
  - Touch-friendly interface
  - Responsive sidebar navigation
  - Adaptive layout for all screen sizes

- **🌙 Theme Management**
  - Light and dark mode support
  - System preference detection
  - Persistent theme preference storage
  - Smooth theme transitions with Framer Motion

- **👤 User Dashboard**
  - Booking history with filtering
  - View past and upcoming bookings
  - Cancel booking functionality
  - Download e-tickets
  - User profile settings
  - Personal information management

---

## 🛠️ Tech Stack (Extended)

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0.3 | React framework with App Router |
| [React](https://react.dev/) | 19.2.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.9 | Utility-first CSS framework |
| [Radix UI](https://www.radix-ui.com/) | Latest | Accessible component primitives |
| [Lucide React](https://lucide.dev/) | 0.454.0 | Icon library |
| [Framer Motion](https://www.framer.com/motion/) | Latest | Animation library |
| [React Hook Form](https://react-hook-form.com/) | 7.60.0 | Efficient form management |
| [Zod](https://zod.dev/) | 3.25.76 | TypeScript-first schema validation |

### UI & Component Libraries

| Library | Purpose |
|---------|---------|
| [shadcn/ui](https://ui.shadcn.com/) | Reusable component collection |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [Recharts](https://recharts.org/) | Data visualization |
| [Embla Carousel](https://www.embla-carousel.com/) | Carousel component |
| [React Day Picker](https://react-day-picker.js.org/) | Date picker |
| [Input OTP](https://github.com/guilhermerodz/input-otp) | OTP input component |
| [cmdk](https://cmdk.paco.me/) | Command menu component |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Resizable layouts |

### Backend & Services

| Service | Purpose |
|---------|---------|
| [Supabase](https://supabase.com/) | PostgreSQL database & authentication |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [Vercel Analytics](https://vercel.com/analytics) | Performance monitoring |

### Development Tools

| Tool | Purpose |
|------|---------|
| [pnpm](https://pnpm.io/) | Package manager |
| [ESLint](https://eslint.org/) | Code linting |
| [PostCSS](https://postcss.org/) | CSS processing |
| [Autoprefixer](https://autoprefixer.github.io/) | CSS vendor prefixes |

---

## 📂 Project Structure

```
movie-ticket-booking-spa/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout wrapper
│   ├── page.tsx                      # Homepage with movie grid
│   ├── loading.tsx                   # Global loading skeleton
│   ├── globals.css                   # Global styles
│   │
│   ├── api/                          # API routes
│   │   ├── movies/route.ts           # GET movies endpoint
│   │   ├── showtimes/route.ts        # GET showtimes endpoint
│   │   └── booking/route.ts          # POST booking endpoint
│   │
│   ├── auth/                         # Authentication routes
│   │   ├── login/page.tsx            # Login page
│   │   ├── sign-up/page.tsx          # Registration page
│   │   ├── callback/route.ts         # OAuth callback
│   │   └── signout/route.ts          # Logout endpoint
│   │
│   ├── movie/                        # Movie-related routes
│   │   └── [id]/page.tsx             # Movie details page
│   │
│   ├── bookings/                     # User bookings
│   │   └── page.tsx                  # Booking history
│   │
│   └── profile/                      # User profile
│       └── page.tsx                  # Profile settings
│
├── components/                       # React components
│   ├── auth/                         # Authentication components
│   │   ├── login-form.tsx            # Login form component
│   │   └── sign-up-form.tsx          # Registration form component
│   │
│   ├── ui/                           # Reusable UI components
│   │   ├── button.tsx                # Button component
│   │   ├── card.tsx                  # Card container
│   │   ├── dialog.tsx                # Modal dialog
│   │   ├── input.tsx                 # Input field
│   │   ├── form.tsx                  # Form wrapper
│   │   ├── select.tsx                # Dropdown select
│   │   ├── toast.tsx & toaster.tsx   # Toast notifications
│   │   ├── tabs.tsx                  # Tab navigation
│   │   ├── carousel.tsx              # Image carousel
│   │   ├── dropdown-menu.tsx         # Dropdown menu
│   │   ├── sheet.tsx                 # Side sheet drawer
│   │   └── [30+ other UI components] # Additional primitives
│   │
│   ├── hero-section.tsx              # Hero banner
│   ├── hero-carousel.tsx             # Trending movies carousel
│   ├── movie-grid.tsx                # Movie listings grid
│   ├── movie-filters.tsx             # Movie filtering options
│   ├── movie-details.tsx             # Movie information panel
│   ├── movie-section.tsx             # Reusable movie section
│   ├── seat-selection.tsx            # Seat picker component
│   ├── booking-flow.tsx              # Booking wizard
│   ├── booking-list.tsx              # User bookings list
│   ├── food-beverage.tsx             # Food & drink selection
│   ├── payment.tsx                   # Payment form
│   ├── ticket-confirmation.tsx       # Order confirmation
│   ├── book-button.tsx               # CTA button
│   ├── site-header.tsx               # Navigation header
│   ├── sidebar.tsx                   # Side navigation
│   ├── user-nav.tsx                  # User menu dropdown
│   ├── theme-provider.tsx            # Theme context provider
│   ├── top-rated-section.tsx         # Top rated movies
│   └── icons.tsx                     # Custom icon components
│
├── hooks/                            # Custom React hooks
│   ├── use-mobile.ts                 # Mobile detection hook
│   ├── use-toast.ts                  # Toast notification hook
│   └── use-draggable-scroll.ts       # Draggable scroll hook
│
├── lib/                              # Utility functions
│   ├── utils.ts                      # Common utilities
│   └── supabase/                     # Supabase integration
│       ├── client.ts                 # Browser Supabase client
│       ├── server.ts                 # Server Supabase client
│       └── middleware.ts             # Auth middleware
│
├── public/                           # Static assets
│   └── [images, fonts, etc.]
│
├── scripts/                          # Utility scripts
│   ├── seed.ts                       # Database seeding
│   ├── seed-supabase.ts              # Supabase data population
│   ├── add-placeholders.ts           # Image placeholder script
│   └── update-images.ts              # Image update utility
│
├── styles/                           # Global styles
│   └── globals.css                   # Tailwind imports & globals
│
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS config
├── postcss.config.mjs                # PostCSS config
├── next.config.mjs                   # Next.js configuration
├── components.json                   # shadcn/ui config
├── middleware.ts                     # Next.js middleware
├── .env.local                        # Local environment variables
└── README.md                         # This file

```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** package manager (pnpm recommended)
- **Git** for version control
- **A Supabase account** ([Create free account](https://app.supabase.com/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/SiddheshCodes4554/movie-ticket-booking-spa.git
cd movie-ticket-booking-spa
```

### Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Set Up Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project or use an existing one
3. Go to **Settings → API** to find your credentials:
   - Copy your **Project URL**
   - Copy your **Anon Key**

4. Create the required database tables:
   - `movies` - Movie information
   - `showtimes` - Movie showtimes
   - `bookings` - User bookings
   - `seats` - Seat information
   - `users` - Extended user data

Or run the seed script to populate the database with sample data:
```bash
pnpm seed-supabase
```

### Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

**Never commit `.env.local` to version control!** Add it to `.gitignore`.

### Step 5: Run the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Step 6: Access the Application

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Click "Sign Up" to create a new account
3. Or use the default test credentials if available
4. Start browsing and booking movies!

---

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase API key | `eyJh...` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics tracking ID | - |

---

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

### Database & Seeding

```bash
# Seed database with sample data
pnpm seed

# Seed Supabase specifically
pnpm seed-supabase

# Update movie images
pnpm update-images

# Add placeholder images
pnpm add-placeholders
```
## 🔐 Authentication Flow

### Sign Up Flow
1. User fills registration form with email and password
2. Form validation using Zod schema
3. Supabase Auth creates new user account
4. Confirmation email sent to user
5. User redirected to login page
6. User logs in with credentials

### Login Flow
1. User enters email and password
2. Supabase Auth validates credentials
3. Session token created and stored in secure cookies
4. User redirected to homepage or intended page
5. Auth middleware verifies token on subsequent requests

### Session Management
- Secure session cookies with HTTP-only flag
- CSRF protection enabled
- Automatic session refresh
- Logout clears session and cookies

---

## 🎫 Booking Flow

### Step 1: Movie Selection
- User browses movies on homepage
- Clicks "Book Now" on selected movie
- Views movie details and available showtimes

### Step 2: Showtime Selection
- Choose date and time
- View available seats count
- Check base ticket price

### Step 3: Seat Selection
- Interactive cinema seat map displayed
- Available seats highlighted in green
- Select preferred seats
- View selected seat summary
- Calculate subtotal

### Step 4: Add-ons Selection
- Browse food and beverage options
- Select items and quantities
- View item prices and total

### Step 5: Review & Payment
- Review complete order summary
- Enter payment details
- Confirm and process payment

### Step 6: Confirmation
- Booking confirmed with reference number
- E-ticket generated and downloadable
- Confirmation sent to email
- Option to add to calendar

---

## 🎨 Styling & Theme

### Design System
- **Color Palette**: Professional cinema-themed colors
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent 4px base unit
- **Border Radius**: Rounded corners for modern look
- **Shadows**: Depth with subtle shadows

### Theme Implementation
- **Provider**: `theme-provider.tsx` wraps the app
- **Storage**: Preference persisted in localStorage
- **System Detection**: Auto-detects OS preference
- **CSS Variables**: Tailwind uses CSS custom properties
- **Smooth Transitions**: Framer Motion for theme changes

### Dark Mode
- Optimized for eye comfort in low light
- High contrast ratios for accessibility
- Distinct color scheme while maintaining brand

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: 1024px - 1280px (lg)
- **Large Desktop**: > 1280px (xl)

---

## ⚡ Performance Optimizations

### Image Optimization
- Next.js Image component for automatic optimization
- Responsive images with srcset
- WebP format support
- Lazy loading by default
- Placeholder blur while loading

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components
- Optimized bundle size

### Caching Strategy
- Static generation for stable pages
- ISR (Incremental Static Regeneration) for semi-dynamic content
- Server-side caching with Supabase
- Browser caching headers

### Database Queries
- Indexed queries for performance
- Select only required fields
- Connection pooling via Supabase
- Query result caching

### Frontend Performance
- React 19 with built-in optimizations
- Memoization for expensive components
- Virtual scrolling for large lists
- Debounced search inputs

---

## 👨‍💻 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Descriptive variable and function names
- Comprehensive comments for complex logic

### Component Structure
```tsx
// Imports
import { FC } from 'react'

// Type definitions
interface ComponentProps {
  prop: string
}

// Component definition
export const Component: FC<ComponentProps> = ({ prop }) => {
  return <div>{prop}</div>
}
```

### API Best Practices
- Use proper HTTP methods (GET, POST, etc.)
- Include error handling
- Return consistent response format
- Add request validation with Zod
- Document with JSDoc comments

### State Management
- Use React hooks for local state
- Consider Context API for shared state
- Use Supabase real-time for live data
- Avoid prop drilling with custom hooks

### Testing
- Write unit tests for utilities
- E2E tests for critical flows
- Test authentication flows
- Test booking workflow

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "Supabase connection failed"**
- Solution: Verify `.env.local` variables
- Check internet connection
- Confirm Supabase project is active
- Check CORS settings in Supabase

**Issue: "Authentication not working"**
- Solution: Clear browser cookies
- Check Supabase Auth configuration
- Verify email domain settings
- Review Auth providers settings

**Issue: "Build fails with TypeScript errors"**
- Solution: Run `npm run lint`
- Check for missing type definitions
- Verify all imports are correct
- Update dependencies: `npm install`

**Issue: "Movies not displaying"**
- Solution: Check database connection
- Verify table structure and data
- Check API route responses
- Review browser console for errors

**Issue: "Seat selection not working"**
- Solution: Verify database has seat data
- Check component event handlers
- Review React state management
- Check for console errors

### Debug Mode
Enable debug logging:
```typescript
// Add to environment
DEBUG=* npm run dev
```

### Browser DevTools
- Use Network tab to inspect API calls
- Use Storage tab to check cookies and localStorage
- Use Console tab for error messages
- Use React DevTools extension

---

## 🤝 Contributing

Contributions are welcome and appreciated! Follow these guidelines:

### Fork & Clone
```bash
git clone https://github.com/your-username/movie-ticket-booking-spa.git
cd movie-ticket-booking-spa
```

### Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### Make Changes
- Follow code style guidelines
- Write descriptive commit messages
- Add comments for complex logic
- Test thoroughly before committing

### Commit & Push
```bash
git add .
git commit -m "feat: Add your feature description"
git push origin feature/your-feature-name
```

### Submit Pull Request
1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your feature branch
4. Fill in PR description
5. Wait for review and feedback

### Pull Request Guidelines
- Descriptive title and description
- Reference related issues
- Include screenshots if UI changes
- Test on multiple devices
- Ensure CI/CD passes

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

The MIT License is a permissive open-source license that allows you to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Use privately

With the requirement to:
- 📋 Include original copyright notice
- 📋 Include license text

---

## 👏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend and Auth
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- All contributors and supporters

---

## 📞 Support & Contact

For questions, issues, or suggestions:

1. **GitHub Issues**: [Create an issue](https://github.com/SiddheshCodes4554/movie-ticket-booking-spa/issues)
2. **GitHub Discussions**: [Join discussions](https://github.com/SiddheshCodes4554/movie-ticket-booking-spa/discussions)
3. **Email**: Contact via GitHub profile

---

## 🚀 Future Enhancements

Planned features for future versions:

- [ ] Real payment gateway integration (Stripe, Razorpay)
- [ ] Email notifications for bookings
- [ ] SMS notifications
- [ ] Movie ratings and reviews
- [ ] Wishlist functionality
- [ ] Group booking discounts
- [ ] Loyalty points system
- [ ] Admin dashboard for cinema management
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Multiple cinema location support
- [ ] Dynamic pricing algorithm
- [ ] Seat recommendations
- [ ] Referral program

---

## 📊 Project Statistics

- **Languages**: TypeScript, JavaScript, CSS
- **Lines of Code**: 5000+
- **Components**: 50+
- **API Routes**: 3+
- **Database Tables**: 4+
- **Dependencies**: 50+

---

**Happy Coding! 🎉 Feel free to star ⭐ this repository if you find it helpful.**

