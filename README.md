# BoM Project (Bill of Materials)

This project is a management system for Bill of Materials (BoM), featuring a robust Django backend and a modern React frontend.

## Architecture

- **Backend**: [Django 6.0.2](https://www.djangoproject.com/) + [Django REST Framework](https://www.django-rest-framework.org/)
- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database**: PostgreSQL (configured via environment variables)
- **Dependency Management**: [uv](https://github.com/astral-sh/uv) (Backend) and [pnpm](https://pnpm.io/) (Frontend)

## Getting Started

### 1. Clone the repository
```bash
git clone git@github.com:newdev-creator/BoM-project.git
cd BoM-project
```

### 2. Environment Setup
Create a `.env` file in the root and the `backend` directory based on `.env.dist`:
```bash
cp .env.dist .env
# Edit .env and provide your MISTRAL_API_KEY and database credentials
```

### 3. Run Docker
```bash
docker compose up --build
```
The API will be available at `http://localhost:8000`.
The application will be accessible at `http://localhost:5173`.

## Features
- Component management for BoM.
- Detailed component views and list views.
- AI integration via Mistral AI.
- Modern, responsive UI with Shadcn components.
