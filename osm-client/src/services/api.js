const VITE_API_URL = import.meta.env.VITE_API_URL;

// Orders
export async function createOrder(order) {
  try {
    const res = await fetch(`${VITE_API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    
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
  const res = await fetch(`${VITE_API_URL}/api/orders/${id}`);
  return res.json();
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${VITE_API_URL}/api/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  
  return res.json();
}

export async function getAllOrders() {
  const res = await fetch(`${VITE_API_URL}/api/orders`);

  return res.json();
}

export async function togglePaymentStatus(orderId) {
  try {
    const res = await fetch(`${VITE_API_URL}/api/orders/${orderId}/payment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Sending orderId in body
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to toggle payment status');
    }

    return data;
  } catch (error) {
    console.error('Failed to toggle payment status:', error);
    throw error;
  }
}

// customers
export async function getAllCustomers(token) {
  try {
    const res = await fetch(`${VITE_API_URL}/api/customers`, {
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization if needed
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch customers');
    }

    return data.customers; // ✅ return the correct array
  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; // return empty array on error to prevent .filter() crash
  }
}

// Products
export async function createProduct(product) {
  try {
    const res = await fetch(`${VITE_API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Product creation failed');
    return data;
  } catch (error) {
    console.error('createProduct error:', error.message);
    throw error;
  }
}

export async function getAllProducts() {
  const res = await fetch(`${VITE_API_URL}/api/products`);
  return res.json();
}
