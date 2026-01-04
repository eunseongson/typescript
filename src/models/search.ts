import { ISimplifiedAlbum } from "./album";
import { IApiResponse } from "./apiResponse";
import { IArtist } from "./artist";
import { ISimplifiedPlaylist } from "./playlist";
import { IShow, ISimplifiedAudioBook, ISimplifiedEposide, ITrack } from "./tracks";

export enum SEARCH_TYPE {
    Track = 'track',
    Album = 'album',
    Artist = 'artist',
    Playlist = 'playlist',
    Episode = 'episode',
    Audiobook = 'audiobook',
    Show = 'show'
}

export interface ISearchRequestParams {
    q: string;
    type: SEARCH_TYPE[];
    market?: string;
    limit?: number;
    offset?: number;
    include_external?: string;
}

export interface ISearchResponse {
    artists?: IApiResponse<IArtist>;
    albums?: IApiResponse<ISimplifiedAlbum>;
    tracks?: IApiResponse<ITrack>;
    playlists?: IApiResponse<ISimplifiedPlaylist>;
    episodes?: IApiResponse<ISimplifiedEposide>;
    shows?: IApiResponse<IShow>;
    audiobooks?: IApiResponse<ISimplifiedAudioBook>;
}