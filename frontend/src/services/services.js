// login service
// src/services/apiService.js
const API_BASE_URL = 'http://localhost:8000';

async function get(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  return handleResponse(response);
}

async function post(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}


async function handleResponse(response) {
  if (!response.ok) {
    const message = `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

export { get, post };