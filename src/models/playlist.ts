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