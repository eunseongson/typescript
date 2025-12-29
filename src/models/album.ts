import { IApiResponse } from "./apiResponse";
import { IArtist } from "./artist";
import { IExternalUrls, IImages, IRestrictions } from "./commonType";

export interface IGetNewReleasesResponse {
    albums: IApiResponse<ISimplifiedAlbum>;
}

export interface ISimplifiedAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: IExternalUrls;
    href: string;
    id: string;
    images: IImages[]
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: IRestrictions;
    type: string;
    url: string;
    artists: IArtist[]
}