# ElectIQ – Election Information Portal

[![Live Application](https://img.shields.io/badge/Live-Application-blue)](https://electiq-portal-820289823158.us-central1.run.app/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Live Application:** [https://electiq-portal-820289823158.us-central1.run.app/](https://electiq-portal-820289823158.us-central1.run.app/)

## Overview

ElectIQ is a modern, AI-powered election information platform designed to democratize access to verified electoral data. The platform serves as a comprehensive resource for citizens seeking reliable candidate information, real-time election updates, and civic education materials.

Built with scalability and user experience in mind, ElectIQ leverages cutting-edge web technologies and artificial intelligence to deliver accurate, timely, and accessible election-related information through an intuitive interface.

---

## Features

- **Verified Candidate Profiles** – Access comprehensive, verified information about electoral candidates
- **Real-time Election Updates** – Stay informed with live election results and news feeds
- **AI-Powered Search** – Intelligent search capabilities powered by Google Gemini Pro
- **Civic Education Resources** – Educational materials to promote informed civic participation
- **Responsive Design** – Seamless experience across desktop, tablet, and mobile devices
- **Secure Data Management** – Enterprise-grade security with Supabase authentication and encryption
- **Real-time Notifications** – Instant updates on election developments and candidate announcements

---

## Architecture

ElectIQ follows a modern monorepo architecture with clear separation between frontend, backend, and shared resources:

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Frontend │ ◄─────► │  Express Backend │ ◄─────► │    Supabase     │
│   (Port 5173)   │         │   (Port 3001)    │         │   (PostgreSQL)  │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌──────────────────┐
│                 │         │                  │
│  Google Gemini  │         │  Winston Logging │
│      Pro AI     │         │                  │
│                 │         │                  │
└─────────────────┘         └──────────────────┘
```

---

## Technology Stack

### Frontend Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | Component-based UI framework |
| Vite | 5.x | Build tool and development server |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| Framer Motion | 11.x | Animation and gesture library |
| React Query | 5.x | Server state management |
| Zustand | 4.x | Client state management |
| Lucide Icons | Latest | Icon system |

### Backend Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express | 4.x | Web application framework |
| TypeScript | 5.x | Type-safe JavaScript |
| Winston | 3.x | Logging framework |
| Zod | 3.x | Schema validation |

### AI & Data Layer

| Service | Purpose |
|---------|---------|
| Google Gemini Pro | AI-powered features and natural language processing |
| Supabase | PostgreSQL database with real-time capabilities |
| Playwright | End-to-end testing framework |

---

## Project Structure

```
electiq/
│
├── electiq-app/                 # Frontend application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Zustand state stores
│   │   ├── services/            # API service layer
│   │   ├── utils/               # Utility functions
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets
│   ├── tests/                   # Playwright E2E tests
│   └── vite.config.ts           # Vite configuration
│
├── server/                      # Backend API
│   ├── src/
│   │   ├── routes/              # API route handlers
│   │   ├── controllers/         # Business logic
│   │   ├── middleware/          # Express middleware
│   │   ├── services/            # External service integrations
│   │   ├── models/              # Data models
│   │   ├── utils/               # Helper functions
│   │   └── config/              # Configuration files
│   └── tsconfig.json            # TypeScript configuration
│
├── docs/                        # Documentation
│   ├── PRD.md                   # Product requirements
│   ├── API.md                   # API documentation
│   └── ARCHITECTURE.md          # Architecture documentation
│
├── package.json                 # Root package configuration
└── README.md                    # This file
```

---

## Getting Started

### Prerequisites

Ensure your development environment meets the following requirements:

- **Node.js** version 18.0.0 or higher
- **npm** version 8.0.0 or higher (or **yarn** 1.22.0+)
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd electiq
```

2. **Install all dependencies**

From the root directory, install dependencies for both frontend and backend:

```bash
npm run install:all
```

This command will:
- Install root-level dependencies
- Install frontend dependencies in `/electiq-app`
- Install backend dependencies in `/server`

3. **Configure environment variables**

Create `.env` files in both the frontend and backend directories:

**Frontend** (`/electiq-app/.env`):
```env
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backend** (`/server/.env`):
```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
GEMINI_API_KEY=your_gemini_api_key
```

### Development

Start the development servers for both frontend and backend:

```bash
npm run dev
```

This will launch:
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3001](http://localhost:3001)

The application will automatically reload when you make changes to the source code.

### Testing

**Run end-to-end tests:**

```bash
npm run test:e2e
```

**Run tests in headed mode (with browser UI):**

```bash
npm run test:e2e:headed
```

**Run tests in debug mode:**

```bash
npm run test:e2e:debug
```

---

## Deployment

### Production Environment

The application is deployed on **Google Cloud Run** with the following specifications:

| Configuration | Value |
|---------------|-------|
| Platform | Google Cloud Run |
| Project ID | `promptwars-virtual-495106` |
| Region | `us-central1` |
| Production URL | [https://electiq-portal-820289823158.us-central1.run.app/](https://electiq-portal-820289823158.us-central1.run.app/) |

### Deployment Process

The application uses containerization for consistent deployments across environments:

```bash
# Build the production container
npm run build

# Deploy to Google Cloud Run
gcloud run deploy electiq-portal \
  --project promptwars-virtual-495106 \
  --region us-central1 \
  --platform managed
```

---

## API Documentation

### Base URL

- **Development:** `http://localhost:3001`
- **Production:** `https://electiq-portal-820289823158.us-central1.run.app/api`

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/candidates` | Retrieve list of candidates |
| GET | `/api/candidates/:id` | Get candidate details |
| GET | `/api/elections` | List active elections |
| POST | `/api/search` | AI-powered search |
| GET | `/api/news` | Latest election news |

For complete API documentation, see [docs/API.md](docs/API.md).

---

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, suggestions, or collaboration opportunities:

- **Project Link:** [https://electiq-portal-820289823158.us-central1.run.app/](https://electiq-portal-820289823158.us-central1.run.app/)
- **Issues:** Please use the GitHub issue tracker for bug reports and feature requests

---

**ElectIQ** – Empowering citizens through technology and information.