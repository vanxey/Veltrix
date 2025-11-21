'use client'
 
import './global.css'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
          <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}