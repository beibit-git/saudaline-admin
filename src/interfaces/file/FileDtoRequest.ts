import { PhotoDtoResponse } from './PhotoDtoResponse';

export interface FileDtoRequest {
  id: number;
  name: string;
  percent: number;
  size: number;
  status: string;
  type: string;
  uid: string;
  response: PhotoDtoResponse;
}
