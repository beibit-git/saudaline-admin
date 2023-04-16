export interface ReviewerDtoResponse {
    
    id: number;
    reviewerName: string; 
    reviewerSurname: string;
    reviewerPatronymic: string;
    reviewerAcademicDegree: string; 
    reviewerWorksAt: string; 
    reviewerCurrentPosition: string; 
    protocolNumber: string;
    reviewerGrade: number;
    diplomaTextPageNumber: number;
    grade: number;
    protocolDateEnd: Date;
    protocolDateStart: Date;
    generalCharacteristicsOfStudentAnswers: string;
    specialOpinionsOfCommission: string;

    
}