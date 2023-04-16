import { FileDtoRequest } from '../file/FileDtoRequest';

export interface ProductDtoRequest {
  title: string;
  description: string;
  brand: number;
  mainPhoto: FileDtoRequest[];
  unitType: number;
  category: number;
  price: number;
  subCategory: number;
  provider: number;
}
