import { AbiturCatalogDtoResponse } from "./AbiturCatalogDtoResponse";

export interface StudentFamilyDtoResponse{
    id: number;
    nameKz: string;
    surnameKz: string;
    patronymicKz: string;
    nameEn: string;
    surnameEn: string;
    patronymicEn: string;
    phone: string;
    familyType: AbiturCatalogDtoResponse;
}