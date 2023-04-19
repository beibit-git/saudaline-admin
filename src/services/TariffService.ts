import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { PromotionDtoForAll } from '../interfaces/Promotions/PromotionDtoForAll';
import { TariffListDto } from '../interfaces/Tariff/TariffListDto';

export class TariffService {
  static baseURL = Constants.API_BASE_URL;

  static getTariffList() {
    return authAxios.get<TariffListDto[]>('/api/v1/tariff/get-all');
  }
}
