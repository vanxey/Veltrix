export default function TradeTable({trades, onDelete}) {
    const categories = ["Asset", "Direction", "Entry", "Exit", "Size", "PnL", "Outcome", "Session", "Strategy", "Reviewed", "Notes","Delete"]
    const columns = ["asset","direction","entry_price","exit_prive","size","pnl","outcome","session_id","strategy","is_reviewed","notes"];

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg p-4">
              <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    {
                        categories.map((category)=>(
                            <th key={category} className="border-b border-gray-700 p-3 text-left">{category}</th>
                        ))          
                    }
                  </tr>
                </thead>
                <tbody className="bg-white">
                {trades.map((trade) => (
                    <tr key={trade.trade_id} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col) => (
                        <td
                        key={col}
                        className={`border-b border-gray-700 p-3 ${
                            col === "pnl"
                            ? trade[col].startsWith("-")
                                ? "text-red-600"
                                : "text-green-600"
                            : ""
                        }
                        
                        `}
                        >  {
                            col === "is_reviewed"
                            ? trade[col] === false
                                ? "❌"
                                : "✅"
                            : ""
                        }
                        {trade[col]}
                        </td>
                    ))}
                    <td className="border-blue-700 p-3 hover:opacity-85">
                        <button
                        onClick={() => onDelete(trade.trade_id)}
                        className="text-red-600 font-semibold text-center cursor-default hover:opacity-50 hover:cursor-pointer"
                        >
                        ✖
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
  );
}
