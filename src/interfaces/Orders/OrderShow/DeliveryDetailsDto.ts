import { CityResponseDto } from '../../provider/CityResponseDto';
import { RegionDto } from '../../provider/RegionDto';
import { CustomerDto } from './CustomerDto';

export interface DeliveryDetailsDto {
  id: number;
  address: string;
  city: CityResponseDto;
  comment: string;
  customer: CustomerDto;
  email: string;
  fio: string;
  region: RegionDto;
  tel: string;
}
