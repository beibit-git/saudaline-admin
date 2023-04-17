import { FileDto } from '../../file/FileDto';
import { BusinessTypeDto } from '../../provider/BusinessTypeDto';
import { CityResponseDto } from '../../provider/CityResponseDto';

export interface CustomerDto {
  address: string;
  alcoholLicense: string;
  businessLicense: string;
  businessNumber: string;
  businessType: BusinessTypeDto;
  city: CityResponseDto;
  id: number;
  logotype: FileDto[];
  name: string;
  phone: string;
  userId: number;
}
