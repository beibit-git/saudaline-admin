import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { ProductDtoRequest } from '../interfaces/Products/ProductDtoRequest';
import { ProductsDtoResponse } from '../interfaces/Products/ProductsDtoResponse';

export class ProductsService {
  static baseURL = Constants.API_BASE_URL;

  //   static getCategories() {
  //     return authAxios.get<CategoriesDtoResponse[]>('/api/v1/categories/get-all-categories');
  //   }

  static getProducts(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<{ list: ProductsDtoResponse[]; total_number: number }>('/api/v1/product/get-all-products', {
      params,
    });
  }

  static getAll() {
    return authAxios.get<ProductsDtoResponse[]>('/api/v1/product/get-all');
  }

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

  static createProductByAdmin(product: ProductDtoRequest) {
    return authAxios.post<number>('/api/v1/product/create-product-by-admin', product);
  }

  // status 200
  static updateProductByAdmin(productId: number, updatedProduct: ProductDtoRequest) {
    return authAxios.put(`/api/v1/product/update-product-by-admin?productId=${productId}`, updatedProduct);
  }

  static cancelSavingExcel(products: ProductsDtoResponse[] | undefined) {
    if (products !== undefined) {
      return authAxios.post(`/api/v1/product/cancel-saving`, products);
    }
  }

  static saveExcel(products: ProductsDtoResponse[], providerId: number) {
    return authAxios.post(`/api/v1/product/save-products-from-excel?providerId=${providerId}`, products);
  }
}
