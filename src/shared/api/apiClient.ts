import { Api } from "./api"

const token = "nastya"

export const api = new Api({
    baseUrl: import.meta.env.VITE_BACKEND,
    baseApiParams: {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
})
