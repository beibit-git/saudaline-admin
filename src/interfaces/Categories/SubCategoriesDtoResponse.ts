import { CategoriesDtoResponse } from './CategoriesDtoResponse';

export interface SubCategoriesDtoResponse {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  category: CategoriesDtoResponse;
}
