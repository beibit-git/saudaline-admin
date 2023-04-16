import { TeacherArticleDtoResponse } from "./TeacherArticleDtoResponse";
import { TeacherCertificateDtoResponse } from "./TeacherCertificateDtoResponse";
import { TeacherDegreeDtoResponse } from "./TeacherDegreeDtoResponse";
import { TeacherDevelopmentsDtoResponse } from "./TeacherDevelopmentsDtoResponse";
import { TeacherEducationInformationResponceDto } from "./TeacherEducationInformationResponceDto";
import { TeacherLegalDocsDtoResponce } from "./TeacherLegalDocsDtoResponce";
import { TeacherScholarInformationDtoResponse } from "./TeacherScholarInformationDtoResponse";
import { TeacherScientificProjectsDtoResponse } from "./TeacherScientificProjectsDtoResponse";
import { TeacherWorkExpDto } from "./TeacherWorkExpDto";

export interface TeacherPublicTeacherDetailDtoResponse {
    articleDto: TeacherArticleDtoResponse[];
    certificateResponseDto: TeacherCertificateDtoResponse[];
    educationalInformationDtoResponse: TeacherEducationInformationResponceDto[];
    scientificProjectDto: TeacherScientificProjectsDtoResponse[];
    scholarInformationDtoResponse: TeacherScholarInformationDtoResponse[];
    teacherWorkExperienceDto: TeacherWorkExpDto[];
    teacherDevelopmentDto: TeacherDevelopmentsDtoResponse[];
    teacherDegreeDto: TeacherDegreeDtoResponse[];
    teacherLegalDto: TeacherLegalDocsDtoResponce[];
}
