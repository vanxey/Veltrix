import { useState, useEffect } from "react";
import Button from "./ui/button";

export default function PopUp({ onClose, onSave, isOpen}) {
  const [form, setForm] = useState({
    asset: "",
    direction: "",
    entry: "",
    exit: "",
    size: "",
    pnl: "",
    outcome: "",
    session: "",
    strategy: "",
    reviewed: "❌",
    notes: "",
    // stopLoss: "",
    // takeProfit: "",
    // dateTime: "",
    // screenshot: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  useEffect(()=>{
    isOpen ? document.body.classList.add("overflow-hidden"): document.body.classList.remove("overflow-hidden")

    return()=>document.body.classList.remove("overflow-hidden")
  },[isOpen]) 

  if (!isOpen) return null

  return (
    <div className="w-full h-full grid place-items-center fixed inset-0 z-50">
      <div className="grid grid-rows-[auto_1fr] bg-gray-800 text-gray-50 max-w-full md:max-w-5xl lg:max-w-6xl w-full max-h-full md:max-h-9/10 py-5 px-10 sm:rounded-xl overflow-auto">
        <div className="flex flex-row justify-between py-4">
          <div className="font-semi text-xl">📈 Add Trade</div>
          <svg
            className="opacity-100 hover:opacity-80"
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#e34c46"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </div>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-1">
              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Asset/Pair:
                </label>
                <input
                  type="text"
                  name="asset"
                  value={form.asset}
                  onChange={handleChange}
                  placeholder="Asset / Pair"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Direction:
                </label>
                <select
                  className="border border-gray-300 rounded-lg w-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="direction"
                  value={form.direction}
                  onChange={handleChange}
                >
                  <option>Direction</option>
                  <option>Buy</option>
                  <option>Sell</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Entry:
                </label>

                <input
                  type="number"
                  name="entry"
                  value={form.entry}
                  onChange={handleChange}
                  placeholder="Entry Price"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Exit:
                </label>

                <input
                  type="number"
                  name="exit"
                  value={form.exit}
                  onChange={handleChange}
                  placeholder="Exit Price"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Size:
                </label>

                <input
                  type="number"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  placeholder="Position Size"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Stop Loss:
                </label>

                <input
                  disabled
                  type="number"
                  name="stop_loss"
                  value={form.stopLoss}
                  onChange={handleChange}
                  placeholder="Stop Loss (optional)"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Take Profit:
                </label>

                <input
                  disabled
                  type="number"
                  name="takeProfit"
                  value={form.takeProfit}
                  onChange={handleChange}
                  placeholder="Take Profit (optional)"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Date & Time:
                </label>

                <input
                  disabled
                  type="datetime-local"
                  name="dateTime"
                  value={form.dateTime}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10 rounded-lg w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Session:
                </label>

                <select
                  className="border border-gray-300 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="session"
                  value={form.session}
                  onChange={handleChange}
                >
                  <option>Session</option>
                  <option>London</option>
                  <option>New York</option>
                  <option>Asia</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Strategy:
                </label>

                <input
                  type="text"
                  name="strategy"
                  value={form.strategy}
                  onChange={handleChange}
                  placeholder="Strategy Tag"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Outcome:
                </label>

                <select
                  className="border border-gray-300 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="outcome"
                  value={form.outcome}
                  onChange={handleChange}
                >
                  <option>Outcome</option>
                  <option>Win</option>
                  <option>Loss</option>
                  <option>BE</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  PnL ($ or %):
                </label>

                <input
                  type="number"
                  name="pnl"
                  value={form.pnl}
                  onChange={handleChange}
                  placeholder="PnL ($ or %)"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="grid gap-1">
              <div className="grid grid-cols-1 grid-rows-2">
                <label className="block text-gray-200 font-medium pt-3">
                  Screenshot Upload
                </label>
                <input
                  disabled
                  type="file"
                  name="file"
                  // value={form.file}
                  // onChange={handleChange}
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid grid-cols-1 grid-rows-1">
                <div className="flex flex-col">
                  <label className="block text-gray-500 font-medium text-sm">
                    Notes & Reflection:
                  </label>

                  <textarea
                    placeholder="Notes / Reflection"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={4}
                  ></textarea>
                </div>
              </div>
              <div className="flex pt-1">
                <Button size="md" type="submit" text="Save Trade" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
