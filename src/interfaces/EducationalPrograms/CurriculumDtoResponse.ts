import { DisciplineDtoResponse } from '../DisciplineDtoResponse';
import { ComponentDtoResponse } from './ComponentDtoResponse';
import { CycleDtoResponse } from './CycleDtoResponse';
import { EducationProgramDtoResponse } from './EducationProgramDtoResponse';

export interface CurriculumDtoResponse {
  id: number;
  educationProgram: EducationProgramDtoResponse;
  discipline: DisciplineDtoResponse;
  cycle: CycleDtoResponse;
  component: ComponentDtoResponse;
  year: number;
  numberOfTrimester: number;
  groupedDisciplines: number;
}
