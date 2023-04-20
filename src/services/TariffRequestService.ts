import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { TariffAddRequest } from '../interfaces/Tariff/TariffAddRequest';
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

  static createTariffRequest(tariffRequest: TariffAddRequest) {
    return authAxios.post(`/api/v1/tariff-request?tariffId=${tariffRequest.tariffId}&tel=${tariffRequest.tel}`);
  }

  static confirmTariff(tariffRequestId: number) {
    return authAxios.patch(`/api/v1/tariff-request/set-paid?tariffRequestId=${tariffRequestId}`);
  }

  static dontConfirmTariff(tariffRequestId: number) {
    return authAxios.patch(`/api/v1/tariff-request/set-unpaid?tariffRequestId=${tariffRequestId}`);
  }
}
