import { FileDto } from '../file/FileDto';
import { ProductsDtoResponse } from '../Products/ProductsDtoResponse';

export interface Promotions {
  id: number;
  title: string;
  description: string;
  subTitle: string;
  discount: number;
  isActive: boolean;
  photo: FileDto[];
  products: ProductsDtoResponse[];
  provider: ProductsDtoResponse;
  startDate: Date;
  finishDate: Date;
}
