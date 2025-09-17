
export default function TradeTable({trades, onDelete}) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg p-4">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Asset</th>
                    <th className="border p-3 text-left">Direction</th>
                    <th className="border p-3 text-left">Entry</th>
                    <th className="border p-3 text-left">Exit</th>
                    <th className="border p-3 text-left">Size</th>
                    <th className="border p-3 text-left">PnL</th>
                    <th className="border p-3 text-left">Outcome</th>
                    <th className="border p-3 text-left">Session</th>
                    <th className="border p-3 text-left">Strategy</th>
                    <th className="border p-3 text-left">Reviewed</th>
                    <th className="border p-3 text-left">Notes</th>
                    {/* <th className="border p-3 text-left">Stop Loss</th>
                    <th className="border p-3 text-left">Take Profit</th>
                    <th className="border p-3 text-left">Date Time</th> */}
                  </tr>
                </thead>
                <tbody className="bg-white">
                    {trades.map((trade, index) => (
                    <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                    >
                        <td className="border p-3">{trade.asset}</td>
                        <td className="border p-3">{trade.direction}</td>
                        <td className="border p-3">{trade.entry}</td>
                        <td className="border p-3">{trade.exit}</td>
                        <td className="border p-3">{trade.size}</td>
                        <td
                        className={`border p-3 ${
                            trade.pnl.startsWith("-")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                        >
                        {trade.pnl}
                        </td>
                        <td className="border p-3">{trade.outcome}</td>
                        <td className="border p-3">{trade.session}</td>
                        <td className="border p-3">{trade.strategy}</td>
                        <td className="border p-3">{trade.reviewed}</td>
                        <td className="border p-3">{trade.notes}</td>

                        {/* <td className="border p-3">{trade.stopLoss}</td>
                        <td className="border p-3">{trade.takeProfit}</td>
                        <td className="border p-3">{trade.dateTime}</td> */}
                           <td className="border p-3">
                            <button
                            onClick={() => onDelete(index)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                            >
                            ✖
                            </button></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
  );
}
