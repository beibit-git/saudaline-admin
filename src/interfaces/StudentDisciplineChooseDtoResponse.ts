import { CurriculumDtoResponse } from './EducationalPrograms/CurriculumDtoResponse';

export interface StudentDisciplineChooseDtoResponse {
  curriculum: CurriculumDtoResponse;
  priority: number;
  createdDate: Date;
}
