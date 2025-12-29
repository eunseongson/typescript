import { IGetCurrentUserPlaylistsRequest, TGetCurrentUserPlaylistResponse } from "../models/playlist";
import api from "../utils/api"

export const getCurrentUserPlaylists = async({limit, offset}:IGetCurrentUserPlaylistsRequest):Promise<TGetCurrentUserPlaylistResponse>=>{
    try{
        console.log("Fetching playlists with limit:", limit, "and offset:", offset);
        const response = await api.get('me/playlists',
            {params:{limit, offset}
        });
        return response.data;
    }catch(error){
        throw new Error('Failed to fetch current user playlists')
    }
}