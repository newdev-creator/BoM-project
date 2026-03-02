# BoM-project Context & Instructions

This project is a Bill of Materials (BoM) management system with a Django/DRF backend and a React/TypeScript frontend.

## Project Structure
- `backend/`: Django 6.0.2 + Django REST Framework.
- `frontend/`: React 19 + TypeScript + Vite + Tailwind CSS + Shadcn UI.

## Tech Stack & Tooling
- **Backend Dependency Management**: Use `uv`.
  - Commands: `uv add <package>`, `uv run manage.py ...`
- **Frontend Dependency Management**: Use `pnpm`.
  - Commands: `pnpm add <package>`, `pnpm install`, `pnpm dev`
- **Python Version**: 3.13+ (as per `.python-version` and `pyproject.toml`).
- **Database**: Standard Django ORM.
- **Authentication**: Custom User model defined in `backend/app/accounts`.

## Coding Standards & Patterns
- **Backend**:
  - Follow PEP 8 and Django best practices.
  - API development uses Django REST Framework.
  - Current implementation uses function-based views (FBVs) with `@api_view`.
  - Core BoM logic resides in `backend/app/bom`.
- **Frontend**:
  - Functional React components with TypeScript.
  - UI components follow the Shadcn UI pattern (located in `frontent/src/components/ui`).
  - Styling is handled via Tailwind CSS utility classes.
  - State management and data fetching should align with React 19 standards.

## Mandates & Constraints
- **Path Sensitivity**: Always use `frontent/` (not `frontend/`) when referencing frontend files.
- **Package Managers**: Do not use `pip` or `npm`/`yarn` directly. Stick to `uv` and `pnpm`.
- **API Consistency**: Maintain the current DRF patterns for new endpoints unless a refactor to Class-Based Views is explicitly requested.
- **Component Design**: New UI components should be added via Shadcn CLI or follow the existing Tailwind/Radix patterns in `frontent/src/components/ui`.
