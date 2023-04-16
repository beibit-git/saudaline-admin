import {StudentDtoResponse} from "../StudentDtoResponse";

export interface CertificateListDtoResponse {
    id: number,
    requestDate: string,
    howToSend: string,
    certificateType: string,
    status: string,
    student: StudentDtoResponse
}