import { IApiResponse } from "./apiResponse";
import { IExternalUrls, IImages, IOwner } from "./commonType";
import { IEpisode, ITrack } from "./tracks";

export interface IGetCurrentUserPlaylistsRequest {
    limit?: number;
    offset?: number;
}

export type TGetCurrentUserPlaylistResponse = IApiResponse<ISimplifiedPlaylist>;

export interface IBasePlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: IExternalUrls;
    href?: string;
    id?: string;
    images?: IImages[];
    name?: string;
    owner?: IOwner;
    type?: string;
    uri?: string;
}

export interface ISimplifiedPlaylist extends IBasePlaylist {
    tracks?: {
        href: string;
        total: number;
    }
}

export interface IGetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface IGetPlaylistResponse extends IBasePlaylist {
    public?: boolean;
    snapshot_id?: string;
    tracks?: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: IPlaylistTrack[];
        type?: string;
        uri?: string;
    }
}

export interface IPlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: IExternalUrls;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null;
    is_local?: boolean;
    track: ITrack | IEpisode
}

export interface IGetPlaylistItemsRequest extends IGetPlaylistRequest {
    offset?: number;
    limit?: number;
}

export type TGetPlaylistItemsResponse = IApiResponse<IPlaylistTrack>

export interface ICreatePlaylistRequest {
    name: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
}