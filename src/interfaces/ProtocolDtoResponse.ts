import { ReviewerDtoResponse } from "./ReviewerDtoResponse";
import { DiplomaQuestions } from "./DiplomaQuestionsDtoResponse";

export interface ProtocolDtoResponse{
    diplomaTextPageNumber: number;
    studentId: number| undefined;
    diplomaWorkId: number| undefined;
    protocolNumber: string;
    protocolDateEnd: Date;
    protocolDateStart: Date;
    grade: number| undefined;
    reviewerGrade: number| undefined;
    reviewerName: string; 
    reviewerSurname: string; 
    reviewerPatronymic: string; 
    reviewerAcademicDegree: string;
    reviewerWorksAt: string;
    reviewerCurrentPosition:  string;
    questions: DiplomaQuestions[] | undefined;
    generalCharacteristicsOfStudentAnswers: string;
    specialOpinionsOfCommission: string;
}