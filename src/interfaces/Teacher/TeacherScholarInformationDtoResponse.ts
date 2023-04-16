import { TeacherPositionDtoResponce } from "./TeacherPositionDtoResponce";

export interface TeacherScholarInformationDtoResponse {
    id: number;
    userId: number;
    platformId: string;
    hindex: string;
    url: string;
    platformType: TeacherPositionDtoResponce;
}