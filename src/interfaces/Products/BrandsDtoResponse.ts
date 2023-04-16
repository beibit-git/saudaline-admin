import { FileDto } from '../file/FileDto';
export interface BrandsDtoResponse {
  id: number;
  name: string;
  logo: FileDto[];
}
