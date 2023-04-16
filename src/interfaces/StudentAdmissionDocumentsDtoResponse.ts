import { AbiturCatalogDtoResponse } from "./AbiturCatalogDtoResponse";
import { AituFileDtoResponse } from "./AituFileDtoResponse";

export interface StudentAdmissionDocumentsDtoResponse{
    id: number;

    identityDocumentType: AbiturCatalogDtoResponse;

    otherDocumentType: string;

    identityDocumentNumber: string;

    identityDocumentIssueDate: Date;

    documentIssuingAuthority: AbiturCatalogDtoResponse;

    identityDocumentValidityPeriod: Date;

    identityDocumentScan: AituFileDtoResponse;

    entCertificate: AituFileDtoResponse;

    graduationCertificate: AituFileDtoResponse;

    graduationCertificateApplication: AituFileDtoResponse;

    documentConfirmingAvailabilityOfInternalGrantScan: AituFileDtoResponse;
}