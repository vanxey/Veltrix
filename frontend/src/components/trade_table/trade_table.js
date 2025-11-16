import { useState, useMemo } from "react"
import { COLUMN_CONFIG } from "@/lib/trade.utils"
import TradeTableRow from "./trade_table_row"

export default function TradeTable({ trades, onDelete }) {
  const [sortKey, setSortKey] = useState('')
  const [filterText, setFilterText] = useState('')
  
  const headers = COLUMN_CONFIG
    .filter(col => !["created_at"].includes(col.key))
    .map(col => col.header)

  const filteredAndSortedTrades = useMemo(() => {
    let filtered = trades
    if (filterText.trim() !== "") {
      const lower = filterText.toLowerCase()
      filtered = trades.filter(trade =>
        COLUMN_CONFIG.some(({ key }) => {
          if (["delete_action", "created_at"].includes(key)) return false
          const val = trade[key]
          return val && String(val).toLowerCase().includes(lower)
        })
      )
    }

    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (!isNaN(aVal) && !isNaN(bVal)) return bVal - aVal
        if (COLUMN_CONFIG.find(c => c.key === sortKey)?.type === "date") {
          return new Date(bVal) - new Date(aVal)
        }
        return String(aVal || "").localeCompare(String(bVal || ""))
      })
    } else {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a["created_at"]
        const bVal = b["created_at"]
        if (COLUMN_CONFIG.find(c => c.key === sortKey)?.type === "date") {
          return new Date(bVal) - new Date(aVal)
        }
        return String(aVal || "").localeCompare(String(bVal || ""))
      })
    }
    return filtered
  }, [trades, filterText, sortKey])

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg p-4">
      {/* --- CONTROLS --- */}
      <div className="flex flex-row justify-end h-10 mb-2 gap-2">
        <div className="flex w-auto">
          <div className="flex flex-col">
            <label className="text-sm px-1">Filter:</label>
            <input 
              className="w-50 border rounded-2xl border-gray-200 text-sm px-2" 
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-auto">
          <div className="flex flex-col">
            <label className="text-sm px-1">Sort:</label>
            <select 
              className="bg-dark-800 text-white w-50 rounded-2xl text-sm px-2"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option className="bg-white text-black">-</option>
              {COLUMN_CONFIG
                .filter((col) => !["delete_action", "notes", "created_at"].includes(col.key))
                .map((col) => (
                  <option key={col.key} value={col.key} className="bg-white text-black">
                    {col.header}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
      
      <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-700 text-white font-semibold">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-gray-200 p-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredAndSortedTrades.map((trade) => (
            <TradeTableRow
              key={trade.trade_id}
              trade={trade}
              onDelete={onDelete}
              filterText={filterText}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}