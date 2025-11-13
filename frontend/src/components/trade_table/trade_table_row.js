import { COLUMN_CONFIG, formatCellValue, highlightMatch } from "@/lib/trade.utils"

export default function TradeTableRow({ trade, onDelete, filterText }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {COLUMN_CONFIG
        .filter((col) => !["created_at"].includes(col.key))
        .map(({ key }) => {
          if (key === "delete_action") {
            return (
              <td key={key} className="border-b border-gray-200 p-3 text-center">
                <button
                  onClick={() => onDelete(trade.trade_id)}
                  className="text-red-600 font-semibold cursor-pointer hover:opacity-50 transition-opacity"
                  aria-label={`Delete trade ${trade.trade_id}`}
                >
                  ✖
                </button>
              </td>
            )
          }

          const { displayValue, className } = formatCellValue(key, trade[key], trade)
          const highlighted = highlightMatch(displayValue, filterText)
          
          return (
            <td
              key={key}
              className={`border-b border-gray-200 p-3 ${className}`}
            >
              {highlighted}
            </td>
          )
        })}
    </tr>
  )
}