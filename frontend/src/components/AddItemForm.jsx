import { useState } from "react";
import { addItem } from "../api";

export default function AddItemForm({ onItemAdded }) {
  const [form, setForm] = useState({ name: "", price: "", store: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = await addItem(form);
    onItemAdded(newItem); // update parent
    setForm({ name: "", price: "", store: "" }); // reset
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2 border rounded mb-4">
      <input
      
        className="border p-2 w-full"
        placeholder="Item name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Store"
        value={form.store}
        onChange={(e) => setForm({ ...form, store: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Item
      </button>
    </form>
  );
}
