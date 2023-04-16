import { SsciCategoriesDtoResponse } from "./SsciCategoriesDtoResponse";

export interface SsciIndicatorsDtoResponse {
    id: number;
    name: string;
    nameEn: string;
    nameRu: string;
    ssciCategory: SsciCategoriesDtoResponse;
}