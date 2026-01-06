import { IImages } from "./commonType";

export interface IBrowseCategoriesRequest {
    locale?: string;
    limit?: number;
    offset?: number;
}

export interface IBrowseCategoriesResponse {
    categories: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: ICategory[];
    }
}

export interface ICategory {
    href: string;
    icons: IImages[];
    id: string;
    name: string;
}