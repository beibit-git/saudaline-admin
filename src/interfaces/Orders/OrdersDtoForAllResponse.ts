import { ProviderDtoResponseForOrderAll } from './ProviderDtoResponseForOrderAll';

export interface OrdersDtoForAllResponse {
  id: number;
  created: Date;
  totalAmount: number;
  totalQuantity: number;
  totalAmountWithDiscount: number;
  status: 'NEW' | 'APPROVED' | 'CANCELED' | 'CLOSED';
  provider: ProviderDtoResponseForOrderAll;
}
