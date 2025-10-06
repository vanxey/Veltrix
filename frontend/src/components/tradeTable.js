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
    default:
      displayValue = value;
      break;
  }

  return { displayValue, className };
};

export default function TradeTable({ trades, onDelete }) {
  const headers = COLUMN_CONFIG.map(col => col.header);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg p-4">
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
          {trades.map((trade) => (
            <tr key={trade.trade_id} className="hover:bg-gray-50 transition-colors">
              {COLUMN_CONFIG.map(({ key }) => {
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

                return (
                  <td
                    key={key}
                    className={`border-b border-gray-200 p-3 ${className}`}
                  >
                    {displayValue}
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
