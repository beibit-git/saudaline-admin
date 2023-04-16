import {CertificateIssuanceType} from "./CertificateIssuanceType";
import {StudentDtoResponse} from "../StudentDtoResponse";
import {CertificateType} from "./CertificateType";
import { CertificateIssuanceStatus } from "./CertificateIssuanceStatus";

export interface CertificateIssuanceRequestDtoResponse {
    city: string | null,
    district: string | null,
    id: number,
    number: number,
    issuanceType: CertificateIssuanceType,
    issued:	CertificateIssuanceStatus,
    requestedDate: Date,
    issuedDate: Date,
    student: StudentDtoResponse,
    type: CertificateType,
    approved: boolean;
    reasonStudent: string;
    reasonDeans: string;
}