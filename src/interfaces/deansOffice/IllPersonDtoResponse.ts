import {StudentDtoResponse} from "../StudentDtoResponse";
import {IllnessCertificateDtoResponse} from "./IllnessCertificateDtoResponse";
import {IllPersonStatus} from "./IllPersonStatus";

export interface IllPersonDtoResponse {
    id: number,
    illnessNotificationDate: Date,
    recoveryNotificationDate: Date,
    status: IllPersonStatus,
    student: StudentDtoResponse,
    illnessCertificate: IllnessCertificateDtoResponse,
}