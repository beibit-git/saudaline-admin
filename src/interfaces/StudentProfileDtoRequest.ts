export interface StudentProfileDtoRequest {
    birthday: Date;
    completedEducationDate: Date;
    completedEducationInstitution: string;
    enrolledEducationDate: Date;
    enrolledEducationInstitution: string;
    entranceExamDocumentIssueDate: Date;
    entranceExamDocumentNumber: string;
    entranceExamTypeId: number;
    // id: number;
    nameEn: string;
    nameKz: string;
    patronymicEn: string;
    patronymicKz: string;
    previousEducationDocumentIssueDate: Date;
    previousEducationDocumentNumber: string;
    previousEducationDocumentTypeId: number
    profileApproved: boolean;
    surnameEn: string;
    surnameKz: string;
}