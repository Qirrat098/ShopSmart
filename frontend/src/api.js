const API_URL = "http://localhost:8000"; // your backend

export async function getItems() {
  const res = await fetch(`${API_URL}/api/items`);
  return res.json();
}

export async function addItem(item) {
  const res = await fetch(`${API_URL}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}
