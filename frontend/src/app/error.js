'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We could not load this section.
        </p>
        <button 
          onClick={() => reset()} 
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  )
}