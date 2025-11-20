import { useState, useEffect } from "react"
import Button from "./ui/button"
import { getTagColorClass } from "@/lib/trade.utils"

export default function PopUp({ onClose, onSave, isOpen, sessions = [], tags = [] }) {
  const [form, setForm] = useState({
    asset: "",
    direction: "",
    entry_date: "",
    exit_date: "",
    size: "",
    pnl: "",
    outcome: "",
    session_id: "",
    strategy: "",
    is_reviewed: false,
    notes: "",
    screenshot: "",
    tags: [],
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    let finalValue = value
    if (name === "session_id") {
      finalValue = e.target.options[e.target.selectedIndex].value
    }
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : finalValue,
    })
  }

  const handleTagChange = (tagId) => {
    setForm(prev => {
        const isSelected = prev.tags.includes(tagId)
        if (isSelected) {
            return { ...prev, tags: prev.tags.filter(id => id !== tagId) }
        } else {
            return { ...prev, tags: [...prev.tags, tagId] }
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  useEffect(() => {
    isOpen ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden")
    return () => document.body.classList.remove("overflow-hidden")
  }, [isOpen])

  if (!isOpen) return null
  //console.log(tags[2].tag_color)
  return (
    <div className="w-full h-full grid place-items-center fixed inset-0 z-50">
      <div className="grid grid-rows-[auto_1fr] bg-white text-gray-900 shadow-xl max-w-full md:max-w-2xl lg:max-w-2xl w-full max-h-full md:max-h-full lg:max-h-9/10 py-5 px-10 sm:rounded-xl overflow-auto">
        <div className="flex flex-row justify-between py-4">
          <div className="font-bold text-2xl">Add Trade</div>
          <svg
            className="opacity-100 hover:opacity-80 hover:cursor-pointer"
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
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Asset/Pair:
                </label>
                <input
                  type="text"
                  name="asset"
                  value={form.asset}
                  onChange={handleChange}
                  placeholder="Asset / Pair"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Direction:
                </label>
                <select
                  className="pl-1 border bg-white text-gray-400 border-gray-300 rounded-lg w-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="direction"
                  value={form.direction}
                  onChange={handleChange}
                  required
                >
                  <option key="direction-default" value="">Direction</option>
                  <option key="buy" value="Buy">Long</option>
                  <option key="sell" value="Sell">Short</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Entry Date:
                </label>

                <input
                  type="date"
                  name="entry_date"
                  value={form.entry_date}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10 rounded-lg w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Exit Date:
                </label>

                <input
                  type="date"
                  name="exit_date"
                  value={form.exit_date}
                  onChange={handleChange}
                  className=" border border-gray-300 p-2 h-10 rounded-lg w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Size:
                </label>

                <input
                  type="number"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  placeholder="Position Size"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Session:
                </label>

                <select
                  className="pl-1 border bg-white text-gray-400 border-gray-300 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="session_id"
                  value={form.session_id}
                  onChange={handleChange}
                  required
                >
                  <option key="default-session" value="">Select Session</option>
                  {sessions.map(s => (
                    <option key={s.session_id} value={s.session_id}>{s.name}</option>
                  ))}
                </select>

              </div>
              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Strategy:
                </label>

                <input
                  type="text"
                  name="strategy"
                  value={form.strategy}
                  onChange={handleChange}
                  placeholder="Strategy Tag"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  Outcome:
                </label>

                <select
                  className="pl-1 border bg-white text-gray-400 border-gray-300 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="outcome"
                  value={form.outcome}
                  onChange={handleChange}
                  required
                >
                  <option key="outcome-default" value="">Outcome</option>
                  <option key="win" value="Win">Win</option>
                  <option key="loss" value="Loss">Loss</option>
                  <option key="be" value="BE">BE</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-600 font-medium text-sm pl-1">
                  PnL ($):
                </label>

                <input
                  type="number"
                  name="pnl"
                  value={form.pnl}
                  onChange={handleChange}
                  placeholder="PnL ($)"
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="block text-gray-600 font-medium text-sm mb-2 pl-1">Tags:</label>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <Button
                            key={tag.tag_id}
                            variant="tertiary"
                            type="button"
                            size="sm"
                            onClick={() => handleTagChange(tag.tag_id)}
                            className={`text-xs px-2 py-1 rounded border transition-colors ${
                                form.tags.includes(tag.tag_id) 
                                ? getTagColorClass(tag.tag_color) 
                                : 'bg-white border-gray-300 text-gray-500 hover:border-blue-500 hover:text-white' 
                            }`}
                        >
                            {tag.tag_name}
                        </Button>
                    ))}
                </div>
              </div>

            </div>
            <div className="grid gap-1">
              <div className="grid grid-cols-1 grid-rows-2">
                <label className="block text-gray-600 font-medium pt-3 pl-1">
                  Screenshot Upload
                </label>
                <input
                  disabled
                  type="file"
                  name="file"
                  value={form.file}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="grid grid-cols-1 grid-rows-1">
                <div className="flex flex-col">
                  <label className="block text-gray-600 font-medium text-sm pl-1">
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
                <label className="text-gray-500 font-medium text-sm pl-1">
                  Reviewed
                </label>
              </div>
              <div className="flex pt-1">
                <Button size="md" type="submit">Save Trade</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}