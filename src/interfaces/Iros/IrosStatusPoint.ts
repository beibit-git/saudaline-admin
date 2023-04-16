import { IrosStatus } from "./IrosStatus";

export interface IrosStatusPoint {
    id?: number | undefined;
    indexStatus: IrosStatus;
    points: number;
    
}