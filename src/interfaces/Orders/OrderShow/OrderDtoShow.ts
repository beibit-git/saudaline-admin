import { ProviderDtoResponse } from '../../provider/ProviderDtoResponse';
import { CustomerDto } from './CustomerDto';
import { DeliveryDetailsDto } from './DeliveryDetailsDto';
import { OrderDetailsDto } from './OrderDetailsDto';

export interface OrderDtoShow {
  id: number;
  status: 'NEW' | 'APPROVED' | 'CANCELED' | 'CLOSED';
  created: Date;
  customer: CustomerDto;
  deliveryDetails: DeliveryDetailsDto;
  details: OrderDetailsDto[];
  provider: ProviderDtoResponse;
  totalAmount: number;
  totalAmountWithDiscount: number;
  totalDiscount: number;
  totalQuantity: number;
  updated: Date;
}
