import { CenterKatoRegionDtoResponse } from "./CenterKatoRegionDtoResponse";

export interface CenterKatoDtoResponse{
    id: number;
    code: string;
    nameru: string;
    namekz: string;
    fullNameru: string;
    fullNamekz: string;
    shortNameru: string;
    shortNamekz: string;
    deep: number;
    updateDate: Date;
    centerKatoRegion: CenterKatoRegionDtoResponse;
    status: number;
    oldCode: number;
}