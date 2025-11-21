# Contributor Guide for Veltrix

Veltrix is an open-source project, and we welcome contributions from the community. By participating in this project, you agree to abide by our code of conduct.

## Getting Started

Please ensure you have completed the local setup defined in the [Getting Started (Procedural)](guides/quickstart.md) guide before proceeding.

## Project Structure

Veltrix uses a monorepo structure separating the frontend and backend applications.

| Directory | Role | Key Technologies |
| :--- | :--- | :--- |
| `frontend/` | The Next.js application, serving the UI and handling client-side logic. | Next.js, React, TailwindCSS, Jest. |
| `backend/` | The Express.js API, handling data persistence and business logic. | Node.js, Express.js, PostgreSQL. |
| `backend/db/` | Contains the PostgreSQL database schema (`schema.sql`). | - |

The frontend uses path aliases defined in `frontend/jsconfig.json` to simplify imports:
* `@/components/*` maps to `frontend/src/components/*`
* `@/hooks/*` maps to `frontend/src/hooks/*`
* `@/lib/*` maps to `frontend/src/lib/*`

## Code Standards and Conventions

We use **ESLint** for code quality and consistency on the frontend. The configuration extends from `next/core-web-vitals`.

* **Styling:** Follow the utility-first approach using **TailwindCSS**.
* **Next.js:** All new components should use React Server Components (`"use client"`) only where necessary for interactivity.

## Testing

Veltrix uses **Jest** and **React Testing Library** for its frontend unit tests.

### Running Tests

To run the test suite, navigate to the `frontend` directory and use the `npm test` script:

```bash
cd frontend
npm test
```

## Example Test Structure

Tests use the same module name mapping as the rest of the application. For example, logic tests are placed in frontend/tests/components/lib/ and assert core functionality:

```bash
// Example from frontend/tests/components/lib/analytics.test.js
describe('calculateAnalytics', () => {
  
  test('should calculate total PnL correctly', () => {
    // ... setup
    const stats = calculateAnalytics(mockTrades)
    expect(stats.totalPnl).toBe(250) //
  })

  test('should calculate average Risk:Reward correctly', () => {
    // ... setup
    const stats = calculateAnalytics(mockTrades)
    expect(stats.avgRiskReward).toBe('1:3.0') //
  })
})
```

## Git Workflow
We use a standard fork and feature-branch workflow.
1. Fork the repository on GitHub.
2. Clone your fork locally.
3. Create a descriptive branch for your feature or bug fix (e.g., `feature/analytics-chart` or `fix/login-bug`).
4. Commit your changes frequently with clear, atomic commit messages.
5. Push your branch to your fork.
6. Create a Pull Request (PR) targeting the main branch of the original repository.
7. Ensure all tests pass and respond to any review comments.
