import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getCurrentUserProfile } from "../apis/useApi"
import { IUser } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<IUser, Error> => {
    const accessToken = localStorage.getItem('access_token');
    return useQuery({
        queryKey: ['current-user-profile'],
        queryFn: getCurrentUserProfile,
        enabled: !!accessToken,
    })
}

export default useGetCurrentUserProfile;