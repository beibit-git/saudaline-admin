export interface IllnessCertificateDtoResponse {
    id: number,
    diseaseCode: string,
    doctorFullName: string,
    issuerFullName: string,
    issuedFullName: string,
    issuedDate: Date,
    certificateStartDate: Date,
    certificateEndDate: Date,
}