import { LessonsTypeDtoResponse } from "./LessonsTypeDtoResponse";

export interface BreakDownByHourDtoResponse {
  id: number;
  disciplineId: number;
  lessonsTypeId: LessonsTypeDtoResponse;
  hours: number;
}