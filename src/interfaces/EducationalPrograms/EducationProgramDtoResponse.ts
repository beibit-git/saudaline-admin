import { AcademicDegreeDtoResponse } from "../AcademicDegreeDtoResponse";
import { DepartmentDtoResponse } from "../DepartmentDtoResponse";
import { EducationLanguageDtoResponse } from "./EducationLanguageDtoResponse";
import { GroupOfEducationProgramDtoResponse } from "./GroupOfEducationProgramDtoResponse";

export interface EducationProgramDtoResponse {
    id: number;
    titleEn: string;
    titleRu: string;
    titleKz: string;
    descriptionEn: string;
    descriptionRu: string;
    descriptionKz: string;
    distinctiveFeaturesEn: string;
    distinctiveFeaturesRu: string;
    distinctiveFeaturesKz: string;
    department: DepartmentDtoResponse;
    typeOfEducationProgram: string;
    typeOfResponse: string;
    status: string;
    levelByNRK: string;
    levelByORK: string;
    academicDegree: AcademicDegreeDtoResponse;
    educationStartedDate: Date;
    volumeCredits: number;
    educationLanguage: EducationLanguageDtoResponse;
    groupOfEducationProgram: GroupOfEducationProgramDtoResponse;
    approvalDateByAcademicCouncil: Date;
    license: boolean;
    accreditation: boolean;
}