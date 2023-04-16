import { CurriculumDtoResponse } from './EducationalPrograms/CurriculumDtoResponse';
import { StudentsListDtoResponse } from './StudentsListDtoResponse';

export interface StudentDisciplineChooseDtoResponse {
  id: number;
  curriculum: CurriculumDtoResponse;
  priority: number;
  LocalDateTime: string;
}

export interface StudentEducationProgramChooseDtoResponse {
  id: number;
  StudentDtoResponse: StudentsListDtoResponse;
  educationProgramId: number;
  LocalDateTime: string;
}
