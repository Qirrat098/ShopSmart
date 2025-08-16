import { useEffect, useState } from "react";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/items")  // ✅ must match backend
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  if (items.length === 0) {
    return <p>No deals available yet</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item._id} className="p-3 border rounded-lg">
          <strong>{item.name}</strong> – Rs. {item.price}  
          <br />
          <small>{item.store}</small>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
