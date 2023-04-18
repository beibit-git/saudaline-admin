import { ProductPromotionDtoForAll } from './ProductPromotionDtoForAll';
import { ProviderDtoForPromotion } from './ProviderDtoForPromotion';

export interface PromotionDtoForAll {
  id: number;
  title: string;
  isActive: boolean;
  startDate: Date;
  finishDate: Date;
  products: ProductPromotionDtoForAll[];
  provider: ProviderDtoForPromotion;
}
