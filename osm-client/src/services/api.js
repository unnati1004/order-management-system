const BASE_URL = 'http://localhost:5000/api';

// Orders
export async function createOrder(order) {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    console.log("Order creation response:", data);
    
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create order');
    }

    return data;
  } catch (error) {
    console.error('Order creation failed:', error.message);
    throw error;
  }
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
  console.log(id,status);
  
  return res.json();
}

export async function getAllOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  // console.log("order",res);
  
  return res.json();
}

// Customers
export async function createCustomer(customer) {
  const res = await fetch(`${BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  return res.json();
}

export async function getAllCustomers() {
  const res = await fetch(`${BASE_URL}/customers`);
  return res.json();
}

// Products
export async function createProduct(product) {
  try {
    // console.log("Sending product to backend:", product); // ✅ LOG

    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    console.log(" sending to backend:", product); // ✅ LOG
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Product creation failed');
    return data;
  } catch (error) {
    console.error('createProduct error:', error.message);
    throw error;
  }
}

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}
