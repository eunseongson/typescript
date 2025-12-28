import axios from "axios";

const api = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
})

api.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return request;
})
export default api;