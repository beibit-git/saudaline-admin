import { AcademicDegreeDtoResponse } from './AcademicDegreeDtoResponse';
import { DepartmentDtoResponse } from './DepartmentDtoResponse';
import { BreakDownByHourDtoResponse } from './EducationalPrograms/BreakDownByHourDtoResponse';

export interface DisciplineDtoResponse {
  id: number;
  titleEn: string;
  titleRu: string;
  titleKz: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionKz: string;
  code: string;
  volumeCredits: string;
  department: DepartmentDtoResponse;
  academicDegree: AcademicDegreeDtoResponse;
  breakDownByHour: BreakDownByHourDtoResponse[];
}
