const BASE_URL = 'http://localhost:5000/api/auth';

const opts = (method: string, body?: object) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include' as RequestCredentials, // sends the httpOnly cookie
  ...(body ? { body: JSON.stringify(body) } : {}),
});

export const api = {
  signup: (full_name: string, email: string, password: string) =>
    fetch(`${BASE_URL}/register`, opts('POST', { full_name, email, password })),

  login: (email: string, password: string) =>
    fetch(`${BASE_URL}/login`, opts('POST', { email, password })),

  me: () =>
    fetch(`${BASE_URL}/me`, opts('GET')),

  logout: () =>
    fetch(`${BASE_URL}/logout`, opts('POST')),
};