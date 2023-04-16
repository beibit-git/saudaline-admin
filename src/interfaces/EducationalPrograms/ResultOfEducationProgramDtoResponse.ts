import { EducationProgramDtoResponse } from "./EducationProgramDtoResponse";

export interface ResultOfEducationProgramDtoResponse {
  id: number;
  resultEn: string;
  resultRu: string;
  resultKz: string;
  code: string;
  educationProgram: EducationProgramDtoResponse
}