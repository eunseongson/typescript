import { IApiResponse } from "./apiResponse";
import { IExternalUrls, IImages, IOwner } from "./commonType";

export interface IGetCurrentUserPlaylistsRequest {
    limit?: number;
    offset?: number;
}

export type TGetCurrentUserPlaylistResponse  = IApiResponse<ISimplifiedPlaylist>;

export interface ISimplifiedPlaylist {
    collaborative?: boolean;
    description?: string;
    external_urls?: IExternalUrls;
    href?: string;
    id?: string;
    images?: IImages[];
    name?: string;
    owner?: IOwner;
    tracks?:{
        href: string;
        total: number;
    }
    type?: string;
    uri?: string;
}

export interface IGetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface IGetPlaylistResponse {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: IExternalUrls;
    href?: string;
    id?: string;
    images?: IImages[];
    name?: string;
    owner?: IOwner;
    public?: boolean;
    snapshot_id?: string;
    tracks?: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    }
    type: string;
    uri: string;
}