import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';
import { TransactionDeductionDto } from '../interfaces/Transaction/TransactionDeductionDto';

export class TransactionDeductionService {
  static baseURL = Constants.API_BASE_URL;

  static getTransactionDeduction(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }
    return authAxios.get<{ list: TransactionDeductionDto[]; total_number: number }>(
      '/api/v1/transaction-deduction/get-all',
      { params }
    );
  }
}
