export interface EducationProgramDtoRequest {
  titleEn: string;
  titleRu: string;
  titleKz: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionKz: string;
  distinctiveFeaturesEn: string;
  distinctiveFeaturesRu: string;
  distinctiveFeaturesKz: string;
  departmentId: number;
  typeOfEducationProgram: string;
  typeOfResponse: string;
  status: string;
  levelByNRK: string;
  levelByORK: string;
  academicDegreeId: number;
  educationStartedDate: Date;
  volumeCredits: number;
  educationLanguageId: number;
  groupOfEducationProgramId: number;
  approvalDateByAcademicCouncil: Date;
  license: boolean;
  accreditation: boolean;
}