export interface IClientCredentialTokenbResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface IAuthUrlParams {
    response_type: 'code';
    client_id: string;
    scope: string;
    redirect_uri: string;
    code_challenge_method: 'S256';
    code_challenge: string;
}

export interface IExchangedTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}