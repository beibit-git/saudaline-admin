import { StudentAdditionalInfoTypeDtoResponse } from "./StudentAdditionalInfoTypeDtoResponse";
import { StudentDtoResponse } from "./StudentDtoResponse";

export interface StudentAdditionalInfoDtoResponse {
  id: number;
  type: StudentAdditionalInfoTypeDtoResponse;
  value: string;
  student: StudentDtoResponse;
}