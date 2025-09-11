export default function Journaling() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Trade Journal</h1>
      <form className="mt-4 space-y-4">
        <input type="text" placeholder="Entry Price" className="border p-2 w-full rounded"/>
        <input type="text" placeholder="Exit Price" className="border p-2 w-full rounded"/>
        <textarea placeholder="Notes" className="border p-2 w-full rounded"></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Trade</button>
      </form>
    </div>
  );
}