import { IrosIndicator } from "./IrosIndicator";
import { IrosStatus } from "./IrosStatus";

export interface IrosApplication{
    id: number;
    studentId: number;
    indicator: IrosIndicator;
    indexStatus: IrosStatus;
    approved: boolean;
    createdDate: Date;
    approvedDate: Date;
    approvedBy: number;
    fileId: number;
    comment: string;
}