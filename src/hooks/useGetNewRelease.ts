import { useQuery } from "@tanstack/react-query"
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewRelease = () => {
    const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey: ['newReleases'],
        queryFn: () => {
            if (!clientCredentialToken) {
                throw new Error('No client credential token available');
            }
            return getNewReleases(clientCredentialToken);
        }
    })
}

export default useGetNewRelease