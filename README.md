# Veltrix - Trading Journal & Analytics Platform

Veltrix is a trading journal built for traders who want a structured way to review their activity. It lets you log trades with full details — asset, direction, P&L, strategy, tags and notes — and review them through a filterable trade log and calendar view. It was built as a team project with a product manager who trades actively and needed something more flexible than a spreadsheet but simpler than the expensive tools out there.

## Live Demo

[https://veltrix-1-g724.onrender.com/](https://veltrix-1-g724.onrender.com/)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Auth | bcryptjs, Resend (email verification) |
| Testing | Jest, React Testing Library |

## Quick Start
```bash
git clone https://github.com/vanxey/Veltrix.git
cd Veltrix
cd frontend && npm install
cd ../backend && npm install
```

Set up your `.env.local` files and run both services — full instructions in the [Getting Started guide](docs/guides/quickstart.md).

## Full Technical Documentation

**All detailed installation instructions, architecture overviews, API references, and contribution guides have been moved to our documentation site:**

[**Read the Veltrix Documentation**](https://vanxey.github.io/Veltrix/) 

* [**Quick Start & Installation**](docs/guides/quickstart.md)
* [**Contributor's Guide**](docs/CONTRIBUTING.md)

## License

This project is open source and available under the MIT License.