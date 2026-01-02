import { IGetCurrentUserPlaylistsRequest, IGetPlaylistItemsRequest, IGetPlaylistRequest, IGetPlaylistResponse, TGetCurrentUserPlaylistResponse, TGetPlaylistItemsResponse } from "../models/playlist";
import api from "../utils/api"

export const getCurrentUserPlaylists = async ({ limit, offset }: IGetCurrentUserPlaylistsRequest): Promise<TGetCurrentUserPlaylistResponse> => {
    try {
        const response = await api.get('me/playlists',
            {
                params: { limit, offset }
            });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch current user playlists')
    }
}

export const getPlaylist = async (params: IGetPlaylistRequest): Promise<IGetPlaylistResponse> => {
    try {
        const response = await api.get(`playlists/${params.playlist_id}`, {
            params
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch playlist')
    }
}

export const getPlaylistItems = async (params: IGetPlaylistItemsRequest): Promise<TGetPlaylistItemsResponse> => {
    try {
        const response = await api.get(`playlists/${params.playlist_id}/tracks`, {
            params
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch playlist items')
    }
}