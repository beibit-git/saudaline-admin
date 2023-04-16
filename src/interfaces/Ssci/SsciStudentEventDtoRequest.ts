import { StudentRoleDtoRequest } from "./StudentRoleDtoRequest";

export interface SsciStudentEventDtoRequest {
    fileId: number;
    link: string;
    info: string;
    hours: number;
    eventId: number;
    studentRoleDtoRequest: StudentRoleDtoRequest;
}