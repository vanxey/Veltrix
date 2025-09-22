import { useState, useEffect } from "react";
import Button from "./ui/button";

export default function PopUp({ onClose, onSave, isOpen}) {
  const [form, setForm] = useState({
    asset: "",
    direction: "",
    entry: "",
    exit: "",
    entry_date: "",
    exit_date: "",
    size: "",
    pnl: "",
    outcome: "",
    session_id: null,
    strategy: "",
    is_reviewed: false,
    notes: "",
    stopLoss: "",
    takeProfit: "", 
    dateTime: "",
    screenshot: "",
  });

  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/session")
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(err => console.error(err));
  }, []);

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target

      let finalValue = value;
      if (name === "session_id") {
          finalValue = e.target.options[e.target.selectedIndex].value
          //console.log(finalValue)
          //console.log(form.session_id)
      }

      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : finalValue,
      })
    }

  const handleSubmit = async (e) => {
      e.preventDefault()

      const tradeData = {
        user_id: null,
        asset: form.asset,
        direction: form.direction,
        entry_date: form.dateTime || new Date().toISOString(),
        entry_price: Number(form.entry),
        exit_price: Number(form.exit) || null,
        size: Number(form.size),
        pnl: Number(form.pnl) || null,
        outcome: form.outcome || null,
        session_id: form.session_id || null,
        strategy: form.strategy || null,
        is_reviewed: form.is_reviewed ? true : false,
        notes: form.notes || null,
        stop_loss: Number(form.stopLoss) || null,
        take_profit: Number(form.takeProfit) || null,
        screenshot_url: null,
      }

      try {
        const response = await fetch("http://localhost:4000/trades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tradeData),
        })

        if (!response.ok) {
          const error = await response.json()
          console.error("Failed to create trade:", error)
          return
        }

        const result = await response.json()
        console.log("Trade created:", result)
        onSave(result)
        onClose()
      } catch (err) {
        console.error("Network error:", err)
      }
  }

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
                  <option key="direction-default" value="">Direction</option>
                  <option key="buy" value="Buy">Buy</option>
                  <option key="sell" value="Sell">Sell</option>
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
                  Entry Date:
                </label>

                <input
                  disabled
                  type="date"
                  name="entry_date"
                  value={form.entryDate}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10 rounded-lg w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-500 font-medium text-sm">
                  Exit Date:
                </label>

                <input
                  disabled
                  type="date"
                  name="exit_date"
                  value={form.exitDate}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10 rounded-lg w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                name="session_id"
                value={form.session_id}
                onChange={handleChange}
              >
                <option key="default-session" value="">Select Session</option>
                {sessions.map(s => (
                  <option key={s.session_id} value={s.session_id}>{s.name}</option>
                ))}
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
                     <option key="outcome-default" value="">Outcome</option>
                      <option key="win" value="Win">Win</option>
                      <option key="loss" value="Loss">Loss</option>
                      <option key="be" value="BE">BE</option>
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
              <div className="flex justify-end items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      name="is_reviewed"
                      checked={form.is_reviewed}
                      onChange={(e) =>
                        setForm({ ...form, is_reviewed: e.target.checked })
                      }
                      className="h-5 w-5"
                    />
                    <label className="text-gray-500 font-medium text-sm">
                      Reviewed
                    </label>
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