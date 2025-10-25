export async function fetchData(path, options = {}) {
    const response = await fetch(`http://localhost:8000/api/v1/${path}`, {
        method: 'GET',
        credentials: 'include',
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