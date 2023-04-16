import {IllPersonStatus} from "./IllPersonStatus";

export interface IllPersonCriteria {
    illPersonStatus: IllPersonStatus;
    illnessNotificationDateStart: Date,
    illnessNotificationDateEnd: Date,
    recoveryNotificationDateStart: Date,
    recoveryNotificationDateEnd: Date,
    groupId: number
}