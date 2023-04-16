import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { BrandsDtoResponse } from '../interfaces/Products/BrandsDtoResponse';
import { ProductDtoRequest } from '../interfaces/Products/ProductDtoRequest';
import { ProductsDtoResponse } from '../interfaces/Products/ProductsDtoResponse';

export class BrandsService {
  static baseURL = Constants.API_BASE_URL;

  static getBrands() {
    return authAxios.get<{ list: BrandsDtoResponse[]; total_number: number }>('/api/v1/brands/get-all-brands');
  }

  // static getProducts(params: any) {
  //   for (const key of Object.keys(params)) {
  //     if (!params[key]) {
  //       delete params[key];
  //     }
  //   }

  //   return authAxios.get<{ list: ProductsDtoResponse[]; total_number: number }>('/api/v1/product/get-all-products', {
  //     params,
  //   });
  // }

  static deleteProduct(productId: number) {
    return authAxios.delete(`/api/v1/product/delete-product?id=${productId}`);
  }

  static getOneProduct(productId: number) {
    return authAxios.get<ProductsDtoResponse>(`/api/v1/product/get-by-id?productId=${productId}`);
  }

  // status 200
  static updateProduct(productId: number, updatedProduct: ProductDtoRequest) {
    return authAxios.put(`/api/v1/product/update-product?productId=${productId}`, updatedProduct);
  }

  // Возвращает ID только что созданной дисциплины
  static createProduct(product: ProductDtoRequest) {
    return authAxios.post<number>('/api/v1/product/create-product', product);
  }
}
