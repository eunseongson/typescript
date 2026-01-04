import { ISimplifiedAlbum } from "./album";
import { IArtist } from "./artist";
import { IExternalUrls, IImages, IRestrictions } from "./commonType";

export interface ITrack {
    album?: ISimplifiedAlbum;
    artists?: IArtist[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: {
        isrc?: string;
        ean?: string;
        upc?: string;
    }
    external_urls?: IExternalUrls;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: ITrack;
    restrictions?: IRestrictions;
    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    type?: 'track';
    uri?: string;
    is_local?: boolean;
}

export interface IEpisode {
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: IExternalUrls;
    href: string;
    id: string;
    images: IImages[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point?: {
        fully_played?: boolean;
        resume_position_ms?: number;
    }
    type: 'episode';
    uri: string;
    restrictions?: IRestrictions;
    show: IShow;
}

export type ISimplifiedEposide = Omit<IEpisode, 'show'>;

export interface IShow {
    available_markets: string[];
    copyrights: {
        text?: string;
        type?: string;
    };
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: IExternalUrls;
    href: string;
    id: string;
    images: IImages[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: 'show';
    uri: string;
    total_episodes: number;
}

export interface ISimplifiedAudioBook {
    authors: {
        name?: string;
    };
    available_markets: string[];
    copyrights: {
        text?: string;
        type?: string;
    };
    description: string;
    html_description: string;
    edition?: string;
    explicit: boolean;
    external_urls: IExternalUrls;
    href: string;
    id: string;
    images: IImages[];
    languages: string[];
    media_type: string;
    name: string;
    narrators: {
        name?: string;
    }
    publisher: string;
    type: 'audiobook';
    uri: string;
    total_chapters: number;
}