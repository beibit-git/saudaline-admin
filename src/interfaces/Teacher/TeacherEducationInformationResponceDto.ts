import { AcademicDegreeDtoResponse } from "../AcademicDegreeDtoResponse";

export interface TeacherEducationInformationResponceDto{
    id: number;
    userId: number;
    educationalInstitution: string;
    admissionYear: number;
    graduationYear: number;
    specialization: string;
    academicDegree: AcademicDegreeDtoResponse;
}
