export interface CurriculumByGroupDtoRequest {
  educationProgramId: number;
  disciplineId: number[];
  year: number;
  cycleId: number;
  componentId: number;
  numberOfTrimester: number;
}