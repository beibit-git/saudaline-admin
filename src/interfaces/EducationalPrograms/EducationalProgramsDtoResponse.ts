import { AcademicDegreeDtoResponse } from "../AcademicDegreeDtoResponse";
import { DepartmentDtoResponse } from "../DepartmentDtoResponse";
import { GroupOfEducationProgramDtoResponse } from "./GroupOfEducationProgramDtoResponse";

export interface EducationalProgramsDtoResponse{
    id: number;
    titleEn: string;
    titleRu: string;
    titleKz: string;
    descriptionEn: string;
    descriptionRu: string;
    descriptionKz: string;
    department: DepartmentDtoResponse;
    academicDegree: AcademicDegreeDtoResponse;
    volumeCredits: number;
    groupOfEducationProgram: GroupOfEducationProgramDtoResponse;
    approvalDateByAcademicCouncil: Date;
    license: boolean;
    accreditation: boolean;
    code: string;
}