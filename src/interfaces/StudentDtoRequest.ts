export interface StudentDtoRequest {
    username: string;
    nameKz: string;
    surnameKz: string;
    patronymicKz: string;
    nameEn: string;
    surnameEn: string;
    patronymicEn: string;
    nationality: number;
    studyLanguage: number;
    birthDate: Date;
    courseGrade: number;
    sexId: number;
    financing: number;
    group: number;
    educationProgramId: number;
    profileApproved: boolean;
    iin: string;
    diplomaWithHonors: boolean;
    hasFinalAttestation: boolean;
    statusType: number;
}