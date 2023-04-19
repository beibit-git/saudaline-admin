import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { TransactionRefillDto } from '../interfaces/Transaction/TransactionRefillDto';

export class TransactionRefillService {
  static baseURL = Constants.API_BASE_URL;

  static getAllTransactionRefill(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }
    return authAxios.get<{ list: TransactionRefillDto[]; total_number: number }>('/api/v1/transaction-refill/get-all', {
      params,
    });
  }
}
