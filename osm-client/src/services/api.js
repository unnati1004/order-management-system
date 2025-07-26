const BASE_URL = 'http://localhost:5000/api';

export async function createOrder(order) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  console.log("frontend",res);
  
  return res.json();
}

export async function getOrderById(id) {
  const res = await fetch(`${BASE_URL}/orders/${id}`);
  return res.json();
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function getAllOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  return res.json();
}