import { AituFileDtoResponse } from './AituFileDtoResponse';
import { FinancingDtoResponse } from './FinancingDtoResponse';
import { NationalityResponse } from './NationalityResponse';
import { StudentGroupsDtoResponse } from './StudentGroupsDtoResponse';
import { StudentStatusTypeDtoResponse } from './StudentStatusTypeDtoResponse';
import { StudentStudyingStatusTypeDtoResponse } from './StudentStudyingStatusTypeDtoResponse';

export interface StudentDtoResponse {
  id: number;
  userId: number;
  nameKz: string;
  surnameKz: string;
  patronymicKz: string;
  nameEn: string;
  surnameEn: string;
  patronymicEn: string;
  iin: string;
  courseGrade: string;
  financing: FinancingDtoResponse;
  nationality: NationalityResponse;
  birthDate: Date;
  educationProgramId: number;
  fullName: string;
  group: StudentGroupsDtoResponse;
  statusTypeId: StudentStatusTypeDtoResponse;
  studyingStatusType: StudentStudyingStatusTypeDtoResponse;
  image3x4: AituFileDtoResponse;
}
