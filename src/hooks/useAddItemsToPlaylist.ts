import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addItemsToPlaylist } from "../apis/playlistApi"
import { IAddItemsToPlaylistRequest } from "../models/playlist"

const useAddItemsToPlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: IAddItemsToPlaylistRequest) => {
            return addItemsToPlaylist(params)
        },
        onSuccess: (_data, variables) => {
            const playlistId = variables.playlist_id;
            if (playlistId) {
                queryClient.invalidateQueries({ queryKey: ['playlist-items', { playlist_id: playlistId, limit: 10 }] });
            }
            queryClient.invalidateQueries({ queryKey: ['getPlaylist'] });
        },
    })
}

export default useAddItemsToPlaylist