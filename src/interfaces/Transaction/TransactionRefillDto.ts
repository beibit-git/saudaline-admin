import { ProviderDtoResponse } from '../provider/ProviderDtoResponse';

export interface TransactionRefillDto {
  id: number;
  execution_time: Date;
  sum: number;
  provider: ProviderDtoResponse;
}
