// src/pages/Deals.jsx
import { useState } from "react";
import AddItemForm from "../components/AddItemForm";
import ItemList from "../components/ItemList";

function Deals() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Best Deals 🏷️</h1>

      {/* Add new items */}
      <AddItemForm onItemAdded={() => setRefresh(!refresh)} />

      {/* Show items list */}
      <ItemList key={refresh} />
    </div>
  );
}

export default Deals;
