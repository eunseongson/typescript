import { atom } from "recoil";

export const searchQuery = atom({
    key: 'searchQuery',
    default: '',
});

export const searchQueryData = atom({
    key: 'searchQueryData',
    default: {}
})

export const searchDebounceQuery = atom({
    key: 'searchDebounceQuery',
    default: ''
})