export const COLUMN_CONFIG = [
  { header: "User", key: "username", className: "hidden xl:table-cell" },
  { header: "Asset", key: "asset", className: "" },
  { header: "Direction", key: "direction", className: "hidden sm:table-cell" },
  { header: "Entry", key: "entry_date", type: "date", className: "hidden lg:table-cell" },
  { header: "Exit", key: "exit_date", type: "date", className: "hidden lg:table-cell" },
  { header: "Size", key: "size", type: "number", className: "hidden md:table-cell" },
  { header: "PnL", key: "pnl", type: "currency", className: "" },
  { header: "Outcome", key: "outcome", className: "" },
  { header: "Session", key: "session_name", type: "session", className: "hidden xl:table-cell" },
  { header: "Strategy", key: "strategy", className: "hidden md:table-cell" },
  { header: "Tags", key: "tags", className: "hidden md:table-cell" },
  { header: "Profit/Loss", key: "is_reviewed", type: "review_status", className: "hidden lg:table-cell" },
  { header: "Notes", key: "notes", className: "hidden 2xl:table-cell" },
  { header: "Delete", key: "delete_action", className: "" },
  { header: "Created", key: "created_at", className: "hidden" },
]

/**
 * Maps a tag color name to a specific TailwindCSS class string for display.
 *
 * @param {string} color - The color name (e.g., 'red', 'blue', 'green').
 * @returns {string} The full TailwindCSS class string, defaulting to blue.
 */
export const getTagColorClass = (color) => {
    const colors = {
        red: '!bg-red-200 !border-red-500 !text-red-700',
        blue: '!bg-blue-200 !border-blue-500 !text-blue-700',
        green: '!bg-green-200 !border-green-500 !text-green-700',
        orange: '!bg-orange-200 !border-orange-500 !text-orange-800',
        purple: '!bg-purple-200 !border-purple-500 !text-purple-700',
        gray: '!bg-gray-200 !border-gray-500 !text-gray-700',
    }
    return colors[color] || colors.blue
}

/**
 * Formats a raw trade cell value into a displayable format (e.g., currency, date, tags)
 * and determines the necessary CSS class for styling.
 *
 * @param {string} key - The column key (e.g., 'pnl', 'exit_date').
 * @param {*} value - The raw value from the trade object.
 * @param {object} trade - The entire trade object for context.
 * @returns {{displayValue: (string|JSX.Element), className: string}} The formatted value and applicable CSS class.
 */
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
      const sign = pnl >= 0 ? '+' : ''
      // Uses custom CSS variables defined in global.css
      className = pnl < 0 ? 'text-[--color-loss]' : 'text-[--color-profit]' 
      displayValue = `${sign}${Math.abs(pnl).toFixed(2)}$`
      break
    case 'is_reviewed':
      displayValue = value === true ? 'Reviewed' : 'Not Reviewed'
      className = value === true ? 'text-[--color-profit]' : 'text-[--color-loss]'
      break
    case 'direction':
      displayValue = value === 'Buy' ? 'Long' : 'Short' // Standardized capitalization for display
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

/**
 * Highlights occurrences of a search query within a text string (case-insensitive).
 * Returns JSX for highlighted text or the original content if no match is found or if input is not a string/number.
 *
 * @param {(string|number|JSX.Element)} text - The full text or element content to search within.
 * @param {string} query - The search string.
 * @returns {(string|JSX.Element)} The text with matching parts wrapped in a highlight span, or the original text/element.
 */
export const highlightMatch = (text, query) => {
  if (!query) return text 
  if (typeof text !== "string" && typeof text !== "number") return text
  let textString = String(text)

  const lowerText = textString.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const start = lowerText.indexOf(lowerQuery)

  if (start === -1) return text 

  const end = start + query.length

  return (
    <>
      {textString.slice(0, start)}
      <span className="bg-blue-300 font-semibold">
        {textString.slice(start, end)}
      </span>
      {textString.slice(end)}
    </>
  )
}