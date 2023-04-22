import { FileDto } from '../file/FileDto';
import { BusinessTypeDto } from '../provider/BusinessTypeDto';
import { CityResponseDto } from '../provider/CityResponseDto';

export interface CustomerDtoResponse {
  id: number;
  name: string;
  businessNumber: string;
  userId: number;
  businessType: BusinessTypeDto;
  phone: string;
  city: CityResponseDto;
  address: string;
  logotype: FileDto[];
}
