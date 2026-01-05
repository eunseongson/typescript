import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addItemsToPlaylist } from "../apis/playlistApi"
import { IAddItemsToPlaylistRequest } from "../models/playlist"

const useAddItemsToPlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: IAddItemsToPlaylistRequest) => {
            return addItemsToPlaylist(params)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getPlaylist'] });
            queryClient.invalidateQueries({ queryKey: ['playlist-items', { playlist_id: params.playlist_id || "", limit: 10 }] });
        },
    })
}

export default useAddItemsToPlaylist