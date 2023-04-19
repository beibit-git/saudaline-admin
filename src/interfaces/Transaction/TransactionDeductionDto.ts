import { OrdersDtoForAllResponse } from '../Orders/OrdersDtoForAllResponse';
import { ProviderDtoResponse } from '../provider/ProviderDtoResponse';

export interface TransactionDeductionDto {
  id: number;
  execution_time: Date;
  sum: number;
  order: OrdersDtoForAllResponse;
  provider: ProviderDtoResponse;
}
