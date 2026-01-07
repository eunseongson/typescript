import { useQuery } from "@tanstack/react-query"
import { getSeveralBrowseCategories } from "../apis/categoryApi"
import { IBrowseCategoriesRequest } from "../models/category"
import useClientCredentialToken from "./useClientCredentialToken"

const useGetSeveralBrowseCategories = (params:IBrowseCategoriesRequest) => {
    const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey: ['browse-categories'],
        queryFn: () => {
            if (!clientCredentialToken) {
                throw new Error('No client credential token available');
            }
            return getSeveralBrowseCategories(params, clientCredentialToken);
        }
    })
}

export default useGetSeveralBrowseCategories