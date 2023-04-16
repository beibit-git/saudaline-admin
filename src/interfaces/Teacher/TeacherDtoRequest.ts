export interface TeacherDtoRequest {
    username: string;
    surnameKz: string;
    nameKz: string;
    patronymicKz: number;
    nameEn: string;
    surnameEn: string;
    patronymicEn: string;
    nationality: number;
    sexId: number;
    positionId: number;
    typeId: number;
    statusId: number;
    departmentId: number;
    imageId: number;
    iin: number;
    birthDate: Date;
    phone: string;
    academicRank: string;
    academicDegree: string;
    scientificInterests: string;
    taughtCourses: string;
}
