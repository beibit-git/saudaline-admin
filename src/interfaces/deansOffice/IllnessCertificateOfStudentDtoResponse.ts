import {IllPersonStatus} from "./IllPersonStatus";

export interface IllnessCertificateOfStudentDtoResponse {
    id: number,
    illnessCertificateId: number,
    illnessNotificationDate: Date
    recoveryNotificationDate: Date,
    status: IllPersonStatus
}