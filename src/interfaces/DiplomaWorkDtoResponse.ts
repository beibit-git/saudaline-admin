import { DiplomaWorkParticipantDtoResponse } from "./DiplomaWorkParticipantDtoResponse";

export interface DiplomaWorkDtoResponse{
    id: number;
    titleKz: string;
    titleRu: string;
    titleEn: string;
    participants: DiplomaWorkParticipantDtoResponse[];
}