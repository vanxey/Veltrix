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
3. Update `backend/src/controllers/authController.js` at **line 70** with your Resend email

 **Note**: The verification link is using localhost (localhost:3000/verify?token=[verification_token]) => if you want to verify on your phone or other devices use the IP of your hosting device instead of localhost e.g. (192.168.x.x:3000/verify?token=[verification_token])

### Environment Configuration

**Backend** (`backend/.env.local`):

Table: Environment Variables

| Variable              | Description                                                      | Example Value                                                     |
|-----------------------|------------------------------------------------------------------|-------------------------------------------------------------------|
| NODE_ENV              | Set to `development` for local database configuration.           | development                                                       |
| DATABASE_URL          | Connection string for your local PostgreSQL instance.            | postgresql://[username]:[password]@localhost:5432/[db_name]       |
| FRONTEND_URL          | The URL of the Next.js frontend (used for email verification).   | http://localhost:3000                                             |
| LOCAL_FRONTEND_IP_URL | Local IP for CORS configuration.                                 | http://192.168.x.x:3000                                           |
| RESEND_API_KEY        | Key for email services (Resend.com).                             | [Key from resend.com]                                             |
| EMAIL_FROM            | Sender email address for verification.                           | [Veltrix] <onboarding@resend.dev>                                 |
| PORT                  | Port for the Express.js backend.                                 | 4000                                                              |


**Frontend** (`frontend/.env.local`):

Table: Frontend Environment Variable

| Variable             | Description                                 | Example Value          |
|----------------------|---------------------------------------------|-------------------------|
| NEXT_PUBLIC_API_URL  | URL of the backend API used by Next.js.     | http://localhost:4000   |


### Running the Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

**Frontend:** Access the application at **http://localhost:3000**
**Backend:**Access the application at **http://localhost:4000**

