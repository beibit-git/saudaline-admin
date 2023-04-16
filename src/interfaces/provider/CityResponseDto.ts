import { RegionDto } from './RegionDto';

export interface CityResponseDto {
  id: number;
  name: string;
  region: RegionDto;
}
