export interface TeacherDegreeDtoRequest {
    id: number;
    userId: number;
    speciality: string;
    degreeFile: FormData;
    teacherEducationalDegree: number;
}