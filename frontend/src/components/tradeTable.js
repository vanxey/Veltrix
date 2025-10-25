import { useState, useMemo } from "react";

const COLUMN_CONFIG = [
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
];

const formatCellValue = (key, value, trade) => {
    let displayValue = value;
    let className = '';

    switch (key) {
        case 'entry_date':
        case 'exit_date':
            displayValue = value ? value.split('T')[0] : 'N/A';
            break;
        case 'size':
            displayValue = parseFloat(value).toFixed(2);
            break;
        case 'pnl':
            const pnl = parseFloat(value);
            displayValue = `${pnl.toFixed(2)}$`;
            className = pnl < 0 ? 'text-red-600' : 'text-green-600';
            break;
        case 'is_reviewed':
            displayValue = value === true ? 'Profit' : 'Loss';
            className = value === true ? 'text-green-600' : 'text-red-600';
            break;
        case 'direction':
            displayValue = value === 'buy' ? 'Long' : 'Short';
            break;
        default:
            displayValue = value;
            break;
    }

    return { displayValue, className };
};

export default function TradeTable({ trades, onDelete }) {
  const [sortKey, setSortKey] = useState('');
  const [filterText, setFilterText] = useState('');
  
  const headers = COLUMN_CONFIG.filter(col => !["created_at"].includes(col.key)).map(col => col.header);

  const filteredAndSortedTrades = useMemo(() => {
    let filtered = trades
    if (filterText.trim() !== "") {
      const lower = filterText.toLowerCase();
      filtered = trades.filter(trade =>
        COLUMN_CONFIG.some(({ key }) => {
          if (["delete_action"].includes(key)) return false;
          if (["created_at"].includes(key)) return false;
          const val = trade[key];
          return val && String(val).toLowerCase().includes(lower);
        })
      );
    }

    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (!isNaN(aVal) && !isNaN(bVal)) return bVal - aVal;
        if (COLUMN_CONFIG.find(c => c.key === sortKey)?.type === "date") {
          return new Date(bVal) - new Date(aVal);
        }
        return String(aVal || "").localeCompare(String(bVal || ""));
      });
    } else{
      filtered = [...filtered].sort((a, b) => {
        const aVal = a["created_at"];
        const bVal = b["created_at"];
        // console.log(sortKey)
        if (COLUMN_CONFIG.find(c => c.key === sortKey)?.type === "date") {
          return new Date(bVal) - new Date(aVal);
        }
        return String(aVal || "").localeCompare(String(bVal || ""));
      })
    }

    return filtered;
  }, [trades, filterText, sortKey]);

  function highlightMatch(text, query) {
    if (!query) return text; // nothing to highlight
    if (typeof text !== "string") text = String(text);

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const start = lowerText.indexOf(lowerQuery);

    if (start === -1) return text; // no match

    const end = start + query.length;

    return (
      <>
        {text.slice(0, start)}
        <span className="bg-blue-300 font-semibold">
          {text.slice(start, end)}
        </span>
        {text.slice(end)}
      </>
    );
  }


    return (
        <div className="overflow-x-auto rounded-lg shadow-lg p-4">
          <div className="flex flex-row justify-end h-10 mb-2 gap-2">
            <div className="flex w-auto">
              <div className="flex flex-col">
                <label className="text-sm px-1">Filter:</label>
                <input className="w-50 border rounded-2xl border-gray-200 text-sm px-2" 
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                /></div>
              </div>
            <div className="flex w-auto">
              <div className="flex flex-col">
              <label className="text-sm px-1">Sort:</label>
              <select className="bg-gray-700 w-50 rounded-2xl text-sm px-2"
               value={sortKey}
               onChange={(e)=>setSortKey(e.target.value)}
              >
                <option className="bg-white text-black">-</option>
                {
                  COLUMN_CONFIG
                  .filter((col) => !["delete_action", "notes"].includes(col.key))
                  .map((col)=>(
                    <option key={col.key} value={col.key} className="bg-white  text-black">{col.header}</option>
                  )
                )

                }
                
                </select></div>
              </div>
          </div>
            <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
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
                        <tr key={trade.trade_id} className="hover:bg-gray-50 transition-colors">
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
                                    );
                                }

                                const { displayValue, className } = formatCellValue(key, trade[key], trade);
                                const highlighted = highlightMatch(displayValue, filterText);
                                
                                //console.log(trade)
                                return (
                                    <td
                                        key={key}
                                        className={`border-b border-gray-200 p-3 ${className}`}
                                    >
                                        {highlighted}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
