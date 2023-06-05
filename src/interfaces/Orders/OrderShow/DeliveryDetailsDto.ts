import { CityResponseDto } from '../../provider/CityResponseDto';
import { RegionDto } from '../../provider/RegionDto';
import { CustomerDto } from './CustomerDto';

export interface DeliveryDetailsDto {
  id: number;
  address: string;
  comment: string;
  customer: CustomerDto;
  email: string;
  fio: string;
  tel: string;
  latitude: number;
  longitude: number;
}
