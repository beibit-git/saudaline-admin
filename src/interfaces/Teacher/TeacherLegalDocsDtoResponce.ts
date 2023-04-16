import { TeacherPatentTypeDtoResponse } from "./TeacherPatentTypeDtoResponse";

export interface TeacherLegalDocsDtoResponce {
    id: number;
    userId: number;
    type: TeacherPatentTypeDtoResponse;
    file: FormData;
}