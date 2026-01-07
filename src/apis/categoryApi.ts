import axios from "axios"
import { IBrowseCategoriesRequest, IBrowseCategoriesResponse } from "../models/category"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"

export const getSeveralBrowseCategories = async (params:IBrowseCategoriesRequest, clientCredentialToken:string):Promise<IBrowseCategoriesResponse> => {
    try{
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
        headers:{
            Authorization: `Bearer ${clientCredentialToken}`
        },
        params: params
    })
    return response.data
    }catch(error){
        throw new Error('Failed to get browse categories')
    }
}