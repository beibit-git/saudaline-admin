import { FileDtoRequest } from '../file/FileDtoRequest';

export interface PromotionsDtoRequest {
  title: string;
  subTitle: string;
  description: string;
  isActive: boolean;
  startDate: Date;
  finishDate: Date;
  photo: FileDtoRequest[];
  provider: number;
}
