import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPlaylist } from "../apis/playlistApi"
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { ICreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
    const { data: user } = useGetCurrentUserProfile();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: ICreatePlaylistRequest) => {
            if (user) {
                return createPlaylist(user.id, params)
            }
            return Promise.reject('User not found');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
            console.log('Playlist created successfully');
        }
    })
}

export default useCreatePlaylist;