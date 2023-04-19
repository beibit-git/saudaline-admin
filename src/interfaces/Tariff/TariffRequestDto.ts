import { ProviderDtoResponse } from '../provider/ProviderDtoResponse';
import { TariffDto } from './TariffDto';
enum TariffRequestStatus {
  NEW,
  PAID,
  UNPAID,
}
export interface TariffRequestDto {
  id: number;
  tariff: TariffDto;
  provider: ProviderDtoResponse;
  created: Date;
  status: TariffRequestStatus;
  sum: number;
  tel: string;
}
