import { notification } from 'antd';
import authAxios from '../common/authAxios';
import { errorNotification } from '../helpers/errorNotification';
import { setErrorMessageByCode } from '../helpers/setErrorMessageByCode';
import { AbiturCatalogDtoResponse } from '../interfaces/AbiturCatalogDtoResponse';
import { StudentDtoRequest } from '../interfaces/StudentDtoRequest';
import { StudentDtoResponse } from '../interfaces/StudentDtoResponse';
import { StudentStatusTypeDtoResponse } from '../interfaces/StudentStatusTypeDtoResponse';
import { StudentStudyingStatusTypeDtoResponse } from '../interfaces/StudentStudyingStatusTypeDtoResponse';
import { downloadFile } from '../helpers/downloadFile';

export class StudentService {
  private static endpointPrefix: string = '/astanait-student-module/api/v1/student';

  static async getStudentIdByUserId(userId: number) {
    return await authAxios.get(`${this.endpointPrefix}/get-student-by-user-id?user_id=${userId}`);
  }

  static async create(student: StudentDtoRequest) {
    return await authAxios.post(`${this.endpointPrefix}/create`, student);
  }

  static getNationalityList() {
    return authAxios.get(`/astanait-student-module/api/v1/nationality/get-all`);
  }

  static getStudentStatusList() {
    return authAxios.get<StudentStatusTypeDtoResponse[]>(`${this.endpointPrefix}/status/types`);
  }

  static getStudentSocialStatusList() {
    return authAxios.get<AbiturCatalogDtoResponse[]>(`${this.endpointPrefix}/status/social/types`);
  }

  static getStudentStudyStatusList() {
    return authAxios.get<StudentStudyingStatusTypeDtoResponse[]>(`${this.endpointPrefix}/study-status/types`);
  }

  static getStudentsByFilter(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get<StudentDtoResponse[]>(`${this.endpointPrefix}/get-student-by-filter`, { params });
  }

  static getFileById(id: number, name: string) {
    return downloadFile(
      `/astanait-file-uploader-module/api/v1/file/data/${id}`,
      'GET',
      'blob',
      name.toString(),
      'xlsx'
    );
  }
}
