## Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vanxey/Veltrix.git
cd Veltrix

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Install backend dependencies
cd  backend
npm install
```

### Database Setup

1. Start your PostgreSQL service
2. Create a new database for Veltrix
3. Import the schema:
   ```bash
   psql -U your_username -d your_database -f backend/db/schema.sql
   ```

### Email Service Setup (Resend)

1. Create an account at [Resend.com](https://resend.com)
2. Copy your API key
3. Update `backend/src/controllers/authController.js` line 55 with your Resend email

### Environment Configuration

**Backend** (`backend/.env.local`):
```env
NODE_ENV=development
DATABASE_URL=postgresql://[username]:[password]@localhost:5432/[db_name]
FRONTEND_URL=http://localhost:3000
RESEND_API_KEY=[your-resend-api-key]
EMAIL_FROM=[Veltrix] <onboarding@resend.dev>
PORT=4000
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Running the Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

Access the application at **http://localhost:3000**

