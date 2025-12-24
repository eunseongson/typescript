import { useQuery } from "@tanstack/react-query"

const useClientCredentialToken = () => {
    useQuery({
        queryKey: ['clientCredentialToken'],
        queryFn : getClientCredentialToken()
    })
}