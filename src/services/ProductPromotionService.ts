import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { CategoriesDtoResponse } from '../interfaces/Categories/CategoriesDtoResponse';
import { CategoryDtoRequest } from '../interfaces/Categories/CategoryDtoRequest';
import { PromotionProductDtoRequest } from '../interfaces/Promotions/PromotionProductDtoRequest';
import { ProductPromotionDtoForAll } from '../interfaces/Promotions/ProductPromotionDtoForAll';
import { ProductForPromotionDto } from '../interfaces/Promotions/ProductForPromotionDto';
import { ProductPromotionDto } from '../interfaces/Promotions/ProductPromotionDto';

export class ProductPromotionService {
  static baseURL = Constants.API_BASE_URL;

  static createProductPromotion(productPromotion: PromotionProductDtoRequest) {
    return authAxios.post<number>('/api/v1/promotion-product/create-products-promotion', productPromotion);
  }

  static getOneProductPromotion(productPromotionId: number) {
    return authAxios.get<ProductPromotionDto>(
      `/api/v1/promotion-product/get-by-id?productPromotionId=${productPromotionId}`
    );
  }

  static deleteProductPromotion(productPromotionId: number) {
    return authAxios.delete(`/api/v1/promotion-product/delete?productPromotionId=${productPromotionId}`);
  }
}
