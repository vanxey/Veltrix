const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env';

export const FETCH_URL = envFile === ".env.local" 
  ? "http://localhost:4000" 
  : "https://veltrix2-backend.onrender.com";