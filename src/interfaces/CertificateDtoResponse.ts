export interface CertificateDtoResponse {
  id: number;
  issuedTo: string;
  isActive: boolean;
  type: string;
  number: string;
  issuedDate: Date;
  validUntil: Date;
  courseName: string;
}
