import { useTokenStore } from '../stores/tokenStore'

export async function fetchData(path, options = {}) {
  const response = await fetch(`http://localhost:8000/api/v1/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    method: 'GET',
    ...options,
  })
  const jsonData = await response.json()

  if (response.status === 200) {
    return jsonData
  }

  if (jsonData?.errors?.[0]?.detail) {
    throw new Error(jsonData.errors[0].detail)
  }

  throw new Error(`HTTP ${response.status}`)
}

export async function submitData(path, payload, options = {}) {
  const { csrfToken } = useTokenStore.getState()
  const response = await fetch(`http://localhost:8000/api/v1/${path}`, {
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(payload),
    ...options,
  })
  const jsonData = await response.json()

  if (response.status === 201) {
    return jsonData
  }

  if (jsonData?.errors?.[0]?.detail) {
    throw new Error(jsonData.errors[0].detail)
  }

  throw new Error(`HTTP ${response.status}`)
}
