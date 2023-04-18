import axios from 'axios';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { CategoriesDtoResponse } from '../interfaces/Categories/CategoriesDtoResponse';
import { SubCategoriesDtoResponse } from '../interfaces/Categories/SubCategoriesDtoResponse';

export class SubCategoriesService {
  static baseURL = Constants.API_BASE_URL;

  static getAllSubCategories() {
    return authAxios.get<{ list: SubCategoriesDtoResponse[]; total_number: number }>(
      '/api/v1/subcategory/get-all-by-category'
    );
  }

  static getSubCategories(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<{ list: SubCategoriesDtoResponse[]; total_number: number }>(
      '/api/v1/subcategory/get-all-by-category',
      { params }
    );
  }

  static deleteSubCategory(subcategoryId: number) {
    return authAxios.delete(`/api/v1/subcategory/delete-by-id?id=${subcategoryId}`);
  }

  static getByCategory(categoryId: number) {
    return authAxios.get<{ list: SubCategoriesDtoResponse[]; total_number: number }>(
      `/api/v1/subcategory/get-all-by-category?categoryId=${categoryId}`
    );
  }
}
