
export default function TradeTable({trades, onDelete}) {
    const categories = ["Asset", "Direction", "Entry", "Exit", "Size", "PnL", "Outcome", "Session", "Strategy", "Reviewed", "Notes","Delete"]
    const columns = ["asset","direction","entry","exit","size","pnl","outcome","session","strategy","reviewed","notes"];

    // add Stop Loss, Take Profit, Date Time in future
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg p-4">
              <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    {
                        categories.map((category)=>(
                            // console.log(category)
                            <th key={category} className="border-b border-gray-700 p-3 text-left">{category}</th>
                        ))          
                    }
                  </tr>
                </thead>
                <tbody className="bg-white">
                {trades.map((trade, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col) => (
                        <td
                        key={col}
                        className={`border-b border-gray-700 p-3 ${
                            col === "pnl"
                            ? trade[col].startsWith("-")
                                ? "text-red-600"
                                : "text-green-600"
                            : ""
                        }`}
                        >
                        {trade[col]}
                        </td>
                    ))}
                    <td className="border-blue-700 p-3 hover:opacity-85">
                        <button
                        onClick={() => onDelete(index)}
                        className="text-red-600 font-semibold text-center"
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
