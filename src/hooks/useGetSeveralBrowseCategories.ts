import { useQuery } from "@tanstack/react-query"
import { getSeveralBrowseCategories } from "../apis/categoryApi"
import { IBrowseCategoriesRequest } from "../models/category"

const useGetSeveralBrowseCategories = (params:IBrowseCategoriesRequest) => {
    return useQuery({
        queryKey: ['browse-categories'],
        queryFn: () => {
            return getSeveralBrowseCategories(params);
        }
    })
}

export default useGetSeveralBrowseCategories