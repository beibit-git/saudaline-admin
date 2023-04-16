import { CenterKatoDtoResponse } from "./CenterKatoDtoResponse";

export interface SchoolsDtoResponse{
    id: number;
    name: string;
    centerKato: CenterKatoDtoResponse;
}