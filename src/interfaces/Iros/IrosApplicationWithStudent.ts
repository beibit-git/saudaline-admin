import { StudentDtoResponse } from "../StudentDtoResponse";
import { IrosIndicator } from "./IrosIndicator";
import { IrosStatus } from "./IrosStatus";

export interface IrosApplicationWithStudent {
    id: number;
    student: StudentDtoResponse;
    indicator: IrosIndicator;
    indexStatus: IrosStatus;
    approved: boolean;
    createdDate: Date;
    approvedDate: Date;
    approvedBy: number;
    fileId: number;
    comment: string;
}