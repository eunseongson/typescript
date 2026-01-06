import { IBrowseCategoriesRequest, IBrowseCategoriesResponse } from "../models/category"
import api from "../utils/api"

export const getSeveralBrowseCategories = async (params:IBrowseCategoriesRequest):Promise<IBrowseCategoriesResponse> => {
    try{
    const response = await api.get('browse/categories', {
        params: params
    })
    return response.data
    }catch(error){
        throw new Error('Failed to get browse categories')
    }
}