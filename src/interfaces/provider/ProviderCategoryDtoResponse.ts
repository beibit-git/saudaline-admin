import { FileDto } from '../file/FileDto';

export interface ProviderCategoryDtoResponse {
  id: number;
  nameKz: string;
  nameRu: string;
  nameEn: string;
  photo: FileDto[];
}
