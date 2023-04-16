import { AbiturCatalogDtoResponse } from "./AbiturCatalogDtoResponse";

export interface DistinctionMarkTypeDtoResponse{
    id: number;
    name: string;
    institutionType: AbiturCatalogDtoResponse;
}