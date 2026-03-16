import { API_URL } from "../api/apiClient"

export const getPosts = async () => {
    const res = await fetch(`${API_URL}/posts`)
    return res.json()
}
