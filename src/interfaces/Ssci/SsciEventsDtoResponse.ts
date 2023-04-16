import { IrosStatus } from "../Iros/IrosStatus";

export interface SsciEventsDtoResponse {
    id: number;
    name: string;
    nameEn: string;
    nameRu: string;
    eventDate: Date;
    indexStatus: IrosStatus;
}