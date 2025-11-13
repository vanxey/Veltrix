export const COLUMN_CONFIG = [
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
  { header: "Delete", key: "delete_action" },
  { header: "Created", key: "created_at" },
]

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
      displayValue = `${pnl.toFixed(2)}$`
      className = pnl < 0 ? 'text-loss' : 'text-profit'
      break
    case 'is_reviewed':
      displayValue = value === true ? 'Profit' : 'Loss'
      className = value === true ? 'text-profit' : 'text-loss'
      break
    case 'direction':
      displayValue = value === 'buy' ? 'Long' : 'Short'
      break
    default:
      displayValue = value
      break
  }

  return { displayValue, className }
}

export const highlightMatch = (text, query) => {
  if (!query) return text 
  if (typeof text !== "string") text = String(text)

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