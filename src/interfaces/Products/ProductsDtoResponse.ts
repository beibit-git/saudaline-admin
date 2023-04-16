import { CategoriesDtoResponse } from '../Categories/CategoriesDtoResponse';
import { SubCategoriesDtoResponse } from '../Categories/SubCategoriesDtoResponse';
import { FileDto } from '../file/FileDto';
import { ProviderDtoResponse } from '../provider/ProviderDtoResponse';
import { BrandsDtoResponse } from './BrandsDtoResponse';
import { UnitTypeDtoResponse } from './UnitTypeDtoResponse';

export interface ProductsDtoResponse {
  id: number;
  title: string;
  description: string;
  brand: BrandsDtoResponse;
  mainPhoto: FileDto[];
  unitType: UnitTypeDtoResponse;
  hits: number;
  amount: number;
  price: number;
  created: Date;
  category: CategoriesDtoResponse;
  subCategory: SubCategoriesDtoResponse;
  provider: ProviderDtoResponse;
  discount: number;
  discountprice: number;
}
