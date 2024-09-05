import axios from "axios";

export const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3'
})

export const api_key = 'a3b35c96ab0a2c276ce1cf49986a816a'