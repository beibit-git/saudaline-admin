import { AbiturCatalogDtoResponse } from "./AbiturCatalogDtoResponse";

export interface StudentAdditionalInfoTypeDtoResponse {
  id: number;
  name: string;
  categoryId: AbiturCatalogDtoResponse;
}