export interface CertificateDtoRequest {
    certificateTypeId: number,
    issuanceType: string,
    city: string | null,
    district: string | null
    reasonStudent: string | null;
}