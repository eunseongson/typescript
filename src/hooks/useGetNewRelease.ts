import { useQuery } from "@tanstack/react-query"
import { getNewReleases } from "../apis/albumApi";

const useGetNewRelease = () => {
    return useQuery({
        queryKey: ['newReleases'],
        queryFn: ()=>{
            return getNewReleases();
        }
    })
}