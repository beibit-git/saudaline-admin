import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { TariffRequestDto } from '../interfaces/Tariff/TariffRequestDto';

export class TariffRequestService {
  static baseURL = Constants.API_BASE_URL;

  static getAllTariffRequest(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }
    return authAxios.get<{ list: TariffRequestDto[]; total_number: number }>('/api/v1/tariff-request/get-all', {
      params,
    });
  }
}
