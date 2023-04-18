import { ProductForPromotionDto } from './ProductForPromotionDto';

export interface ProductPromotionDto {
  id: number;
  discount: number;
  discountPrice: number;
  isActive: boolean;
  product: ProductForPromotionDto;
}
