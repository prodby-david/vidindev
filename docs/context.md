# Portfolio Project Context

## Overview
Full-stack developer portfolio and content management studio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion, Prisma 8, PostgreSQL, and AWS S3.

## Architecture
Modular domain-driven design under `src/features/`. Each feature encapsulates:
- `admin/`: Studio tabs, modal dialogs, and hooks for content curation
- `components/`: Client and server rendering UI components
- `constants/`: Default fallback data, iconography mappings, and static definitions
- `repository/`: Database operations using Prisma 8 ORM
- `service/`: Domain logic and model transformations
- `validator/`: Zod schemas for input validation
- `hooks/`: State and interaction management hooks

## Features
- **About**: Bio summary, interactive Polaroid snapshots marquee, and 3D flip card credentials carousel
- **Projects**: Case study showcase with problem, solution, impact breakdown, and external links
- **Skills**: Categorized technical stacks (Frontend, Backend, Database, DevOps, DevTools)
- **Experience**: Career timeline with custom iconography, role details, and verified skills
- **Gear**: Development hardware, software, workflow, and design tooling inventory
- **Contact**: Inquiries submission form with direct contact channels and FAQ
- **Chatbot**: Embedded AI assistant persona backed by OpenRouter
- **Storage**: AWS S3 pre-signed upload pipeline for direct asset management
- **Dashboard**: Protected content studio (`/dashboard`) with cookie-based session verification

## Database Schema (Prisma 8)
- `Stack`: id, name, category, timestamps
- `Contact`: id, name, email, phone, subject, message, createdAt
- `Project`: id, number, title, description, tags, link, imageSrc, timestamps
- `Experience`: id, role, company, period, details, skills, icon, timestamps
- `Certification`: id, title, institution, period, details, type, credentialImage, credentialId, verificationUrl, timestamps
- `PolaroidSnapshot`: id, src, caption, alt, timestamps
- `Gear`: id, category, items, timestamps

## API Routes
- `POST /api/auth/login` - Admin session authentication
- `POST /api/auth/logout` - Clear admin session
- `GET /api/certifications` | `POST` | `PATCH` | `DELETE` - Certifications management
- `GET /api/experience` | `POST` | `PATCH` | `DELETE` - Experience management
- `GET /api/projects` | `POST` | `PATCH` | `DELETE` - Projects management
- `GET /api/skills` | `POST` | `DELETE` - Skills management
- `GET /api/gear` | `POST` | `PATCH` | `DELETE` - Gear management
- `GET /api/marquee` | `POST` | `PATCH` | `DELETE` - Polaroid snapshots management
- `POST /api/contact` | `GET` - Submit inquiry / Retrieve inquiries (admin)
- `POST /api/chatbot` - AI assistant replies
- `POST /api/storage/presign` - S3 pre-signed URL generator

## Verification
- TypeScript type-checking: `pnpm exec tsc --noEmit` passing with 0 errors.
- Prisma contract: `pnpm run contract:emit` synchronized with contract.d.ts and contract.json.
