import { DepartmentDtoResponse } from "../DepartmentDtoResponse";
import { TeacherPositionDtoResponce } from "./TeacherPositionDtoResponce";
import { TeacherStatusDtoResponse } from "./TeacherStatusDtoResponse";
import { TeacherTypeDtoResponse } from "./TeacherTypeDtoResponse";

export interface TeacherDtoResponse {
    id: number;
    userId: number;
    nameKz: string;
    surnameKz: string;
    patronymicKz: string;
    nameEn: string;
    surnameEn: string;
    patronymicEn: string;
    academicDegree: string;
    academicRank: string;
    nationalityId: number;
    sexId: number;
    department: DepartmentDtoResponse;
    position: TeacherPositionDtoResponce;
    imageId: number;
    iin: string;
    birthDate: Date;
    phone: string;
    type: TeacherTypeDtoResponse;
    status: TeacherStatusDtoResponse;
    scientificInterests: string;
    taughtCourses: string;
    resumeId: number;
}
