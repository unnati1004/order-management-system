
export async function loginUser(credentials) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  return data;
}

export async function createUser(user) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return data;
}
export function logoutUser() {
  // localStorage.removeItem('token');
  // localStorage.removeItem('user');
}