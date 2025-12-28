export interface IExternalUrls {
    spotify: string;
}

export interface IImages {
    url: string;
    height: number | null;
    width: number | null;
}

export interface IRestrictions {
    reason: string;
}

export interface IFollowers {
    href: string | null;
    total: number;
}

export interface IExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}