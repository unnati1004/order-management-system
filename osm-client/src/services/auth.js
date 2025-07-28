    //  const BASE_URL = 'http://localhost:5000/api';
    // const BASE_URL = import.meta.env.BASE_URL;
console.log('import.meta.env.BASE_URL', import.meta.env.VITE_API_URL);

export async function loginUser(credentials) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  // if (res.ok) {
  //   localStorage.setItem('token', data.token);
  //   localStorage.setItem('user', JSON.stringify(data.user)); // 👈 Store user info
  // }
  return data;
}

export async function createUser(user) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  // if (res.ok) {
    // localStorage.setItem('token', data.token);
    // localStorage.setItem('user', JSON.stringify(data.user)); // 👈 Same here
  // }
  return data;
}
export function logoutUser() {
  // localStorage.removeItem('token');
  // localStorage.removeItem('user');
}