import { ProductsDtoResponse } from '../Products/ProductsDtoResponse';

export interface PromotionProducts {
  id: number;
  isActive: boolean;
  discount: number;
  discountPrice: number;
  product: ProductsDtoResponse;
}
