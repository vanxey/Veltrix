export default function PopUp({onClose}){
    

    return (
        <div 
            className="w-full h-full grid place-items-center fixed inset-0 z-50"
        >
            <div className="grid grid-rows-[auto_1fr] bg-gray-800 text-gray-50 w-8/10 h-9/10 p-5 rounded-xl overflow-auto">

                <div className="flex justify-end"><svg className="opacity-100 hover:opacity-80" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="#e34c46" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12"/></svg></div>
                <div className="grid grid-rows-[auto_1fr] gap-4">
                    <div>📈 Add Trade</div>
                    <form>
                    <div className="grid grid-cols-2 grid-rows-6 gap-1">
                            <input
                            type="text"
                            placeholder="Asset / Pair"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <select className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Direction</option>
                            <option>Buy</option>
                            <option>Sell</option>
                            </select>

                            <input
                            type="number"
                            placeholder="Entry Price"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                            type="number"
                            placeholder="Exit Price"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                            type="number"
                            placeholder="Position Size"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                            type="number"
                            placeholder="Stop Loss (optional)"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                            type="number"
                            placeholder="Take Profit (optional)"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                            type="datetime-local"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <select className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Session</option>
                            <option>London</option>
                            <option>New York</option>
                            <option>Asia</option>
                            </select>

                            <input
                            type="text"
                            placeholder="Strategy Tag"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <select className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Outcome</option>
                            <option>Win</option>
                            <option>Loss</option>
                            <option>BE</option>
                            </select>

                            <input
                            type="number"
                            placeholder="PnL ($ or %)"
                            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                    </div>
                    <div className="grid gap-1">
                    <div className="grid grid-cols-1 grid-rows-2">
                        <label className="block text-gray-200 font-medium pt-3">Screenshot Upload</label>
                        <input
                        type="file"
                        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="grid grid-cols-1 grid-rows-1">
                        <textarea
                            placeholder="Notes / Reflection"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
                    >
                        Save Trade
                    </button>
                    </div>
                    </div>

                    </form>
                </div>
            </div>
        </div>
    )
}