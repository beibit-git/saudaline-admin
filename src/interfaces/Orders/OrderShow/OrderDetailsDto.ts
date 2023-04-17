import { ProductsDtoResponse } from '../../Products/ProductsDtoResponse';

export interface OrderDetailsDto {
  product: ProductsDtoResponse;
  id: number;
  price: number;
  quantity: number;
  discount: number;
  sumWithDiscount: number;
  sum: number;
  priceWithDiscount: number;
}
