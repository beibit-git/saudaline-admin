import { AbiturCatalogDtoResponse } from "./AbiturCatalogDtoResponse";

export interface AituFileDtoResponse{
    id: number;
    userId: number;
    name: string;
    contentType: string;
    extension: string;
    type: AbiturCatalogDtoResponse;
    path: string;
}