import { useState } from "react";
import Button from "./ui/button";
import { getTagColorClass } from "@/lib/trade.utils";

export default function TagsForm ({tags = [], onAddTag, onDeleteTag, className}){
    const [form, setForm] = useState({
    name: "",
    type: "Strategy", 
    color: "blue" 
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    
    onAddTag(form)
    setForm({ name: "", type: "Strategy", color: "blue" })
  }
    return(
        <div className={`flex w-full h-auto bg-gray-900 p-5 rounded-2xl flex-col gap-3 ${className}`}>
            <div className="text-xl text-white text-bold">Add Tags Here:</div>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-end">
                
                <div className="flex flex-col gap-1 w-full md:w-auto grow">
                <label className="text-xs text-gray-500">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Impulse"
                    className="border border-gray-300 text-gray-200 p-2 h-9 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    required
                />
                </div>

                <div className="flex flex-col gap-1 w-full md:w-40">
                <label className="text-xs font-semibold text-gray-500">Category</label>
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="pl-1 border bg-white text-xs text-gray-400 border-gray-300 rounded-lg w-full h-9 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="Strategy">Strategy</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Mistake">Mistake</option>
                    <option value="Condition">Condition</option>
                </select>
                </div>

                <div className="flex flex-col gap-1 w-full md:w-32">
                <label className="text-xs font-semibold text-gray-500">Color</label>
                <select
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    className="pl-1 border bg-white text-xs text-gray-400 border-gray-300 rounded-lg w-full h-9 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="purple">Purple</option>
                    <option value="gray">Gray</option>
                </select>
                </div>

                <div className="w-full md:w-auto">
                    <Button variant="primary" size="sm" className="h-9 w-full md:w-auto" type="submit">
                    + Add
                    </Button>
                </div>
            </form>

            {tags && tags.length > 0 && (
                <div className="flex flex-col gap-2">
                    <div className="text-md text-gray-300">Already created:</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {tags.map(tag => (
                            <div key={tag.tag_id} className="flex flex-wrap w-auto text-gray-400 border-1 py-1 px-2  rounded-2xl gap-2">
                                <span className="flex grow text-xs items-center">{tag.tag_name}</span>
                                <Button 
                                    size="sm"
                                    onClick={() => onDeleteTag(tag.tag_id)}
                                    className="text-gray-400 border-0 hover:bg-red-400 font-bold text-xs !rounded-4xl h-5 w-5 pt-1.5 flex justify-center items-center"
                                    title="Delete Tag"
                                >
                                    ×
                                </Button>
                        
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}