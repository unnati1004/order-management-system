     const BASE_URL = 'http://localhost:5000/api';

export async function createUser(user) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (res.ok) localStorage.setItem('token', data.token);
  return data;
}

export function logoutUser() {
  localStorage.removeItem('token');
}
