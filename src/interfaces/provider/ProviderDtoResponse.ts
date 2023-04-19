import { TariffDto } from '../Tariff/TariffDto';
import { FileDto } from '../file/FileDto';
import { BusinessTypeDto } from './BusinessTypeDto';
import { CityResponseDto } from './CityResponseDto';
import { ProviderCategoryDtoResponse } from './ProviderCategoryDtoResponse';

export interface ProviderDtoResponse {
  id: number;
  userId: number;
  name: string;
  businessNumber: string;
  phone: string;
  address: string;
  businessType: BusinessTypeDto;
  providerCategory: ProviderCategoryDtoResponse;
  logotype: FileDto[];
  city: CityResponseDto;
  balance: number;
  tariff: TariffDto;
}
