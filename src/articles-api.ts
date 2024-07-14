import axios from "axios";
import {Response} from "./types"

const API_KEY = "TiX6_SucpFpj3g4kTAJkSz-JJMEsg5hV3VUf7B5f1s0"
axios.defaults.baseURL = "https://api.unsplash.com";

export const FetchImages = async (query:string, currentPage:number):Promise<Response> => {
    const response  = await axios.get("/search/photos?",{
        params: {
            query: query, 
            client_id: API_KEY,
            page: currentPage,
            per_page: 12,
           orientation: 'landscape'
        }
    })
   
    return {
        result: response.data.results,
        total: response.data.total
    }
}