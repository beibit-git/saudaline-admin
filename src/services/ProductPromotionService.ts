import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { PromotionProductDtoRequest } from '../interfaces/Promotions/PromotionProductDtoRequest';
import { ProductPromotionDto } from '../interfaces/Promotions/ProductPromotionDto';

export class ProductPromotionService {
  static baseURL = Constants.API_BASE_URL;

  static createProductPromotion(productPromotion: PromotionProductDtoRequest) {
    return authAxios.post<number>('/api/v1/promotion-product/create-products-promotion', productPromotion);
  }

  static updateProductPromotion(productPromotionId: number, productPromotion: PromotionProductDtoRequest) {
    console.log('Service:' + productPromotionId);
    return authAxios.put<number>(
      `/api/v1/promotion-product/update?productPromotionId=${productPromotionId}`,
      productPromotion
    );
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
