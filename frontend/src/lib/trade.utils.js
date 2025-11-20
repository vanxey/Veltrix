export const COLUMN_CONFIG = [
  { header: "User", key: "username" },
  { header: "Asset", key: "asset" },
  { header: "Direction", key: "direction" },
  { header: "Entry", key: "entry_date", type: "date" },
  { header: "Exit", key: "exit_date", type: "date" },
  { header: "Size", key: "size", type: "number" },
  { header: "PnL", key: "pnl", type: "currency" },
  { header: "Outcome", key: "outcome" },
  { header: "Session", key: "session_name", type: "session" },
  { header: "Strategy", key: "strategy" },
  { header: "Profit/Loss", key: "is_reviewed", type: "review_status" },
  { header: "Notes", key: "notes" },
  { header: "Tags", key: "tags" },
  { header: "Delete", key: "delete_action" },
  { header: "Created", key: "created_at" },
]

export const getTagColorClass = (color) => {
    const colors = {
        red: '!bg-red-200 !border-red-500 !text-red-700',
        blue: '!bg-blue-200 !border-blue-500 !text-blue-700',
        green: '!bg-green-200 !border-green-500 !text-green-700',
        orange: '!bg-orange-200 !border-orange-500 !text-orange-800',
        purple: '!bg-purple-200 !border-purple-500 !text-purple-700',
    }
    return colors[color] || colors.blue
}

export const formatCellValue = (key, value, trade) => {
  let displayValue = value
  let className = ''

  switch (key) {
    case 'entry_date':
    case 'exit_date':
      displayValue = value ? value.split('T')[0] : 'N/A'
      break
    case 'size':
      displayValue = parseFloat(value).toFixed(2)
      break
    case 'pnl':
      const pnl = parseFloat(value)
      const sign = pnl > 0 ? '+' : ''
      displayValue = `${sign}${pnl.toFixed(2)}$`
      className = pnl < 0 ? 'text-loss' : 'text-profit'
      break
    case 'is_reviewed':
      displayValue = value === true ? 'Reviewed' : 'Not Reviewed'
      className = value === true ? 'text-profit' : 'text-loss'
      break
    case 'direction':
      displayValue = value === 'buy' ? 'Long' : 'Short'
      break
    case 'tags':
      if (Array.isArray(value) && value.length > 0) {
        displayValue = (
          <div className="flex flex-wrap gap-1">
            {value.map(tag => (
              <span 
                key={tag.tag_id} 
                className={`px-2 py-0.5 rounded text-xs border ${getTagColorClass(tag.tag_color)}`}
              >
                {tag.tag_name}
              </span>
            ))}
          </div>
        )
      } else {
        displayValue = <span className="text-gray-400 text-xs">-</span>
      }
      break
    default:
      displayValue = value
      break
  }

  return { displayValue, className }
}

export const highlightMatch = (text, query) => {
  if (!query) return text 
  if (typeof text !== "string" && typeof text !== "number") return text
  // if (typeof text !== "string") text = String(text)

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const start = lowerText.indexOf(lowerQuery)

  if (start === -1) return text 

  const end = start + query.length

  return (
    <>
      {text.slice(0, start)}
      <span className="bg-blue-300 font-semibold">
        {text.slice(start, end)}
      </span>
      {text.slice(end)}
    </>
  )
}