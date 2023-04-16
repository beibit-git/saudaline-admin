import { TeacherEducationalDegree } from "./TeacherEducationalDegree";

export interface TeacherDegreeDtoResponse {
    id: number;
    userId: number;
    speciality: string;
    fileId: FormData;
    teacherEducationalDegree: TeacherEducationalDegree;
}