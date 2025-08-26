const API_URL = "http://localhost:8000";

// Items API
export async function getItems(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/items?${queryString}`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function getItemById(id) {
  const res = await fetch(`${API_URL}/api/items/${id}`);
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
}

export async function addItem(item) {
  const res = await fetch(`${API_URL}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
}

export async function updateItem(id, updates) {
  const res = await fetch(`${API_URL}/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_URL}/api/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
}

export async function getFeaturedDeals() {
  const res = await fetch(`${API_URL}/api/items/deals/featured`);
  if (!res.ok) throw new Error('Failed to fetch deals');
  return res.json();
}

export async function getPriceComparison(itemId) {
  const res = await fetch(`${API_URL}/api/items/${itemId}/compare`);
  if (!res.ok) throw new Error('Failed to fetch price comparison');
  return res.json();
}

// Stores API
export async function getStores() {
  const res = await fetch(`${API_URL}/api/stores`);
  if (!res.ok) throw new Error('Failed to fetch stores');
  return res.json();
}

export async function getStoreById(id) {
  const res = await fetch(`${API_URL}/api/stores/${id}`);
  if (!res.ok) throw new Error('Failed to fetch store');
  return res.json();
}

// Users API
export async function getUserProfile(firebaseUid) {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}`);
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
}

export async function createOrUpdateUser(userData) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Failed to create/update user');
  return res.json();
}

export async function updateUserPreferences(firebaseUid, preferences) {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}/preferences`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(preferences),
  });
  if (!res.ok) throw new Error('Failed to update preferences');
  return res.json();
}

export async function addToShoppingList(firebaseUid, itemData) {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}/shopping-list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  if (!res.ok) throw new Error('Failed to add to shopping list');
  return res.json();
}

export async function updateShoppingListItem(firebaseUid, itemId, updates) {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}/shopping-list/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update shopping list item');
  return res.json();
}

export async function removeFromShoppingList(firebaseUid, itemId, listName = 'My Shopping List') {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}/shopping-list/${itemId}?listName=${listName}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error('Failed to remove from shopping list');
  return res.json();
}

export async function addDealAlert(firebaseUid, itemId, targetPrice) {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}/deal-alerts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, targetPrice }),
  });
  if (!res.ok) throw new Error('Failed to add deal alert');
  return res.json();
}

export async function toggleDealAlert(firebaseUid, itemId, isActive) {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}/deal-alerts/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });
  if (!res.ok) throw new Error('Failed to toggle deal alert');
  return res.json();
}

export async function toggleFavoriteItem(firebaseUid, itemId) {
  const res = await fetch(`${API_URL}/api/users/${firebaseUid}/favorites/${itemId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error('Failed to toggle favorite');
  return res.json();
}
