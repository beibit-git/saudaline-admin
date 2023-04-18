import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { CategoriesDtoResponse } from '../interfaces/Categories/CategoriesDtoResponse';
import { CategoryDtoRequest } from '../interfaces/Categories/CategoryDtoRequest';
import { PromotionProductDtoRequest } from '../interfaces/Promotions/PromotionProductDtoRequest';

export class ProductPromotionService {
  static baseURL = Constants.API_BASE_URL;

  static createProductPromotion(productPromotion: PromotionProductDtoRequest) {
    return authAxios.post<number>('/api/v1/promotion-product/create-products-promotion', productPromotion);
  }
}
