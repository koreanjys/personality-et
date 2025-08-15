# Overview

This is a React-based personality test application that analyzes users' MBTI (Myers-Briggs Type Indicator) personality types and "에겐-테토" (Egen-Teto) characteristics through an interactive questionnaire. The app provides personalized compatibility analysis and relationship recommendations based on the test results.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and variables
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: 
  - Screen-based components (Welcome, Test, Loading, Result)
  - Reusable UI components from shadcn/ui library
  - Custom hooks for mobile detection and toast notifications

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Data Storage**: In-memory storage with interface for future database integration
- **API Design**: RESTful endpoints for saving and retrieving test results
- **Development**: Vite middleware integration for hot module replacement

## Database Schema Design
- **ORM**: Drizzle ORM with PostgreSQL dialect configuration
- **Schema**: Test results table with personality type, egen-teto type, answers (JSON), and timestamps
- **Validation**: Zod schemas for type-safe data validation
- **Migrations**: Drizzle Kit for schema migrations

## Application Flow
- **Multi-screen Experience**: Progressive questionnaire with welcome → test → loading → results flow
- **Question Logic**: 10 questions covering MBTI dimensions (E/I, S/N, T/F, J/P) plus Egen-Teto characteristics
- **Result Calculation**: Client-side algorithm calculating personality scores and compatibility matching
- **User Experience**: Loading animations, progress tracking, and result sharing capabilities

## Key Features
- **Personality Analysis**: MBTI type determination with Egen-Teto characteristics
- **Compatibility Matching**: Best and worst match recommendations with detailed explanations
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support
- **Internationalization**: Korean language support with proper typography

# External Dependencies

## Core Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **UI Components**: Radix UI primitives, Lucide React icons, Class Variance Authority
- **Styling**: Tailwind CSS, clsx utility, tailwind-merge for conditional classes
- **State Management**: TanStack React Query for server state caching and synchronization

## Backend Dependencies  
- **Server Framework**: Express.js with TypeScript support
- **Database**: Neon Database serverless PostgreSQL, Drizzle ORM
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds
- **Session Management**: connect-pg-simple for PostgreSQL session storage

## Build and Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Development**: Replit-specific plugins for error overlay and cartographer
- **Package Management**: npm with lockfile version 3
- **TypeScript**: Strict mode configuration with ES modules and bundler resolution

## Third-party Integrations
- **Font Loading**: Google Fonts integration (Inter, Architects Daughter, DM Sans, etc.)
- **Image Assets**: Unsplash integration for hero images
- **Development Banner**: Replit development environment banner script