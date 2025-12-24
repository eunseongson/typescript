import axios from "axios";
import { clientId, clientSecret } from "../configs/authConfig";

const encodedBase64 = (data:string)=>{
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export const getClientCredentialToken = async()=>{
    try{
        const body = new URLSearchParams({
            grant_type: 'client_credentials',
        });
        const response = await axios.post('https://accounts.spotify.com/api/token', body, {
            headers:{
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
}