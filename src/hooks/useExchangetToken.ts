import { useMutation } from "@tanstack/react-query"
import { exchangetToken } from "../apis/authApi";
import { IExchangedTokenResponse } from "../models/auth";

export const useExchangetToken = () => {
    return useMutation<IExchangedTokenResponse, Error, { code: string, codeVerifier: string }>({
        mutationFn: ({ code, codeVerifier }) => exchangetToken(code, codeVerifier),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
        }
    })
}