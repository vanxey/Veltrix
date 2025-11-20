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
                  className="text-red-600 cursor-pointer border-1 border-transparent transition-color duration-200 hover:scale-105 hover:border-red-400 hover:shadow-md hover:bg-red-100 hover:border-1 font-semibold text-lg !rounded-4xl h-5 w-5 flex justify-center items-center pb-0.5"
                  aria-label={`Delete trade ${trade.trade_id}`}
                >
                  ×
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