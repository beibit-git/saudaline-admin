import { StudentDtoResponse } from "../StudentDtoResponse";
import { SsciCategoriesDtoResponse } from "./SsciCategoriesDtoResponse";
import { SsciEventsDtoResponse } from "./SsciEventsDtoResponse";

export interface SsciStudentEventDtoResponse {
    id: number;
    student: StudentDtoResponse;
    ssciEvents: SsciEventsDtoResponse;
    fileId: number;
    link: string;
    info: string;
    hours: number;
    roleId: SsciCategoriesDtoResponse;
}