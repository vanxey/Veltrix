# Veltrix

A full-stack web application designed to empower traders by providing tools to log, review, and analyze their trading activity. Veltrix helps users track their performance, identify patterns, and learn from past trades through a comprehensive journaling and analytics dashboard.

## 🚀 Live Demo

[https://veltrix-1-g724.onrender.com/](https://veltrix-1-g724.onrender.com/)

> **Note:** The application is hosted on Render's free tier. Instances may spin down after inactivity, which can cause longer initial load times.

## ✨ Features

- **Trade Journaling**: Log detailed trade information including:
  - Asset
  - Direction (Long/Short)
  - Entry/Exit dates
  - Position size
  - P&L (Profit & Loss)
  - Outcome
  - Strategy
  - Notes
  - Session

- **Dynamic Trade Log**: View all logged trades in an interactive table with:
  - Filtering capabilities
  - Sorting options
  - Easy data navigation

- **Session Management**: Organize trades by trading sessions for focused review and analysis

- **Performance Analytics**: Foundation for a comprehensive analytics dashboard with structured data for in-depth analysis

- **Responsive Design**: Optimized for seamless experience across various devices (desktop, tablet, mobile)

## 🛠️ Technology Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (React) - Fast, scalable, and SEO-friendly user interface
- **Styling**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS for rapid UI development
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`) and Custom Hooks (`useTrades`, `useAuth`)
- **Routing**: Next.js Router
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Backend

- **Runtime**: [Node.js](https://nodejs.org/) - Asynchronous event-driven JavaScript runtime
- **Web Framework**: [Express.js](https://expressjs.com/) - Robust API and HTTP request handling
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Powerful open-source relational database
- **Database Client**: `pg` - Node.js PostgreSQL client
- **Middleware**: CORS, body-parser

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher): [Download from nodejs.org](https://nodejs.org/en/download)
- **npm**: Comes with Node.js
- **PostgreSQL**: [Download from postgresql.org](https://www.postgresql.org/download/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vanxey/Veltrix.git
cd Veltrix
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install
```

### 3. Set Up PostgreSQL Database

1. Start your PostgreSQL service
2. Import the provided DB Schema (/backend/db/schema.sql)

### 4. Set up Resend.com for Email verification
1. Create an account on Resend.com
2. Copy the API KEY into env.local
3. Go to /backend/src/controllers/authController.js => go to line 55 => replace email with the mail you have signed up with at Resend.com => instead it should look like this: "example.email@gmail.com"
4. Save file

### 5. Configure Environment Variables

Create `.env` files for both frontend and backend with the necessary configuration:

**Backend `.env.local`:**
```env
NODE_ENV=development
DATABASE_URL=postgresql://[username]:[password]@localhost:5432[db_name]
FRONTEND_URL=http://localhost:3000
RESEND_API_KEY=[Key from resend.com]
EMAIL_FROM=[Veltrix] <onboarding@resend.dev>
PORT=4000
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 6. Run the Application

**Start the backend server:**
```bash
cd backend
npm run dev
```

**Start the frontend development server:**
```bash
cd frontend
npm run dev
```

The application should now be running at `http://localhost:3000`
The backend should now be running at `http://localhost:4000`

## 🧪 Testing

Run the test suite:

```bash
# Frontend tests
cd frontend
npm test
```

## 📁 Project Structure

```
Veltrix/
├── frontend/             # Next.js frontend
│   ├── components/       # UI components
│   ├── pages/            # Routes and views
│   ├── styles/           # TailwindCSS config and styles
│   └── hooks/            # Custom React hooks
├── backend/              # Express API
│   ├── index.js          # Entry point for the API server
│   ├── routes/           # API route definitions
│   ├── controllers/      # Business logic / request handlers
│   └── db/               # DB Schema
└── README.md
```

## 📝 License

This project is open source and available under the MIT License.

## Veltrix
- Built with Next.js, Express.js, and PostgreSQL
- Styled with TailwindCSS
- Tested with Jest and React Testing Library

