import Button from "./ui/button";

export default function Table_card_analytics({className=""}){
    return (
        <div className={`flex flex-col h-auto w-full p-15 gap-5 bg-white rounded-xl
        shadow-xl border border-gray-100 
        ${className}
        `}>
            <div className="flex flex-row place-items-center">
                <div className="flex flex-col grow gap-1">
                    <div className="flex text-2xl font-bold">Top Performing Trades</div>
                    <div className="flex text-sm text-gray-500 px-1">Your best trades this month</div>
                </div>
                <Button className="text-sm font-bold border-1 py-0 px-2 shadow-none" text="View All" border/>
            </div>
            <div className="flex w-full">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200">
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Pair</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Type</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Entry Date</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Lot Size</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">P&L</th>
                        </tr>
                    </thead>
                 <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                        <td className="py-4 px-4 text-center"><div className="font-bold text-slate-900">EUR/GBP</div></td>
                        <td className="py-4 px-4 text-center"><div className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Buy</div></td>
                        <td className="py-4 px-4 text-center text-slate-700">Jun 7, 2024</td>
                        <td className="py-4 px-4 text-center text-slate-700">1.2</td>
                        <td className="py-4 px-4 text-center"><div className="font-bold text-emerald-600">+$825</div></td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                        <td className="py-4 px-4 text-center"><div className="font-bold text-slate-900">EUR/USD</div></td>
                        <td className="py-4 px-4 text-center"><div className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Buy</div></td>
                        <td className="py-4 px-4 text-center text-slate-700">Jun 21, 2024</td>
                        <td className="py-4 px-4 text-center text-slate-700">1.5</td>
                        <td className="py-4 px-4 text-center"><div className="font-bold text-emerald-600">+$695</div></td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                        <td className="py-4 px-4 text-center"><div className="font-bold text-slate-900">USD/JPY</div></td>
                        <td className="py-4 px-4 text-center"><div className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Buy</div></td>
                        <td className="py-4 px-4 text-center text-slate-700">Jun 5, 2024</td>
                        <td className="py-4 px-4 text-center text-slate-700">1</td>
                        <td className="py-4 px-4 text-center"><div className="font-bold text-emerald-600">+$670</div></td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                        <td className="py-4 px-4 text-center"><div className="font-bold text-slate-900">USD/CHF</div></td>
                        <td className="py-4 px-4 text-center">
                            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">Sell</div>
                        </td>
                        <td className="py-4 px-4 text-center text-slate-700">Jun 12, 2024</td>
                        <td className="py-4 px-4 text-center text-slate-700">0.8</td>
                        <td className="py-4 px-4 text-center"><div className="font-bold text-emerald-600">+$540</div></td>
                    </tr>
                </tbody>
                    </table>
            </div>
        </div> 
    )
}