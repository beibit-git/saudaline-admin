import { FileDto } from '../file/FileDto';

export interface ProductForPromotionDto {
  id: number;
  title: string;
  mainPhoto: FileDto[];
  price: number;
}
