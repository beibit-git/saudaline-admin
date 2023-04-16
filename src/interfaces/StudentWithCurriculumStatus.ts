import { StudentDtoResponse } from "./StudentDtoResponse";

export interface StudentWithCurriculumStatus{
    studentDtoResponse: StudentDtoResponse;
    status: Boolean;
}