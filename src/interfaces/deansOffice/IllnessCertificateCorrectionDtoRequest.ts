export interface IllnessCertificateCorrectionDtoRequest {
    id: number,
    diseaseCode: string,
    doctorFullName: string,
    issuerFullName: string,
    issuedFullName: string,
    certificateStartDate: string
}