export default function Card({ icon, title, description, items = [], className = "" }) {
  return (
    <div 
        className={`flex flex-col justify-between bg-white border border-gray-100 rounded-xl shadow-xl p-6 w-full md:w-80 h-full  max-w-sm flex-shrink-0 ${className}`} 
    >
      <div className="mb-4 flex">
        <div className="bg-blue-600 p-2 rounded-xl">{icon}</div>
      </div>

      <div className="mb-4 flex-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-md text-gray-800 mt-1">{description}</p>
      </div>

      <ul className="list-disc list-inside space-y-1 text-md text-gray-800 mt-auto">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
