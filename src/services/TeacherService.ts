import axios from 'axios';
import authAxios from '../common/authAxios';
import { DisciplineDtoResponse } from '../interfaces/DisciplineDtoResponse';
import { StudentGroupsDtoResponse } from '../interfaces/StudentGroupsDtoResponse';
import { Constants } from '../common/constants';
import { TeacherCertificateDto } from '../interfaces/Teacher/TeacherCertificateDto';
import { TeacherEducationInformationResponceDto } from '../interfaces/Teacher/TeacherEducationInformationResponceDto';
import { TeacherEducationInformationRequestDto } from '../interfaces/Teacher/TeacherEducationInformationDtoRequest';
import { TeacherPositionDtoResponce } from '../interfaces/Teacher/TeacherPositionDtoResponce';
import { TeacherTypeDtoResponse } from '../interfaces/Teacher/TeacherTypeDtoResponse';
import { TeacherStatusDtoResponse } from '../interfaces/Teacher/TeacherStatusDtoResponse';
import { AcademicStreamWithGroupsDtoResponse } from '../interfaces/Teacher/AcademicStreamWithGroupsDtoResponse';
import { TeacherScholarInformationDtoRequest } from '../interfaces/Teacher/TeacherScholarInformationDtoRequest';
import { TeacherScholarInformationDtoResponse } from '../interfaces/Teacher/TeacherScholarInformationDtoResponse';
import { TeacherWorkExpDto } from '../interfaces/Teacher/TeacherWorkExpDto';
import { TeacherDevelopmentsDtoResponse } from '../interfaces/Teacher/TeacherDevelopmentsDtoResponse';
import { TeacherDevelopmentsDtoRequest } from '../interfaces/Teacher/TeacherDevelopmentDtoRequest';
import { AcademicDegreeDtoResponse } from '../interfaces/AcademicDegreeDtoResponse';
import { TeacherDegreeDtoResponse } from '../interfaces/Teacher/TeacherDegreeDtoResponse';
import { TeacherEducationalDegree } from '../interfaces/Teacher/TeacherEducationalDegree';
import { TeacherDegreeDtoRequest } from '../interfaces/Teacher/TeacherDegreeDtoRequest';
import { TeacherLegalDocsDtoResponce } from '../interfaces/Teacher/TeacherLegalDocsDtoResponce';
import { TeacherPatentTypeDtoResponse } from '../interfaces/Teacher/TeacherPatentTypeDtoResponse';
import { downloadFile } from '../helpers/downloadFile';

export class TeacherService {
  static baseURL = Constants.API_BASE_URL;

  static getTeacherArticles() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get(`/astanait-teacher-module/api/v1/teacher/article/user/${userId}`);
  }

  static addTeacherArticle(data: any) {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    data.userId = userId;
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/article/create`, data);
  }

  static editTeacherArticle(data: any) {
    return authAxios.put(`/astanait-teacher-module/api/v1/teacher/article/update`, data);
  }

  static deleteTeacherArticle(articleId: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/article/delete/${articleId}`);
  }

  static getTeacherScientificProjects() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get(`/astanait-teacher-module/api/v1/teacher/scientific-project/user/${userId}`);
  }

  static addTeacherScientificProject(data: any) {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    data.userId = userId;
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/scientific-project/create`, data);
  }

  static editTeacherScientificProjects(data: any) {
    return authAxios.put(`/astanait-teacher-module/api/v1/teacher/scientific-project/update`, data);
  }

  static deleteTeacherScientificProjects(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/scientific-project/delete/${id}`);
  }

  // 404 (not found)
  static getTeacherScholarDocuments() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get(`/astanait-teacher-module/api/v1/teacher/scholar-document/${userId}`);
  }

  static getTeacherScholarInformationList() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get<TeacherScholarInformationDtoResponse[]>(
      `/astanait-teacher-module/api/v1/teacher/scholar-information/user/${userId}`
    );
  }

  static addTeacherScholarInformation(scholarInformation: TeacherScholarInformationDtoRequest) {
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/scholar-information/create`, scholarInformation);
  }

  static editTeacherScholarInformation(scholarInformation: TeacherScholarInformationDtoRequest) {
    return authAxios.put(`/astanait-teacher-module/api/v1/teacher/scholar-information/update`, scholarInformation);
  }

  static deleteTeacherScholarInformation(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/scholar-information/delete/${id}`);
  }

  static getTeacherCertificate(certificateId: number) {
    return authAxios({
      url: `/astanait-teacher-module/api/v1/teacher/certificate/data/${certificateId}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      const fileExtension = response.headers['content-disposition'].split('.')[1].slice(0, -1);
      link.href = url;
      link.setAttribute('download', `Certificate.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
    });
  }

  static deleteTeacherCertificate(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/certificate/delete/${id}`);
  }

  static updateTeacherCertificate(id: number, teacherCerificateDto: TeacherCertificateDto) {
    return authAxios.put(
      `/astanait-teacher-module/api/v1/teacher/certificate/update/${id}`,
      teacherCerificateDto.fileId
    );
  }

  static getTeacherEducationInformation(id: number) {
    return authAxios.get<TeacherEducationInformationResponceDto>(
      `/astanait-teacher-module/api/v1/teacher/educational-information/${id}`
    );
  }

  static getTeacherEducationInformationList() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get<TeacherEducationInformationResponceDto[]>(
      `/astanait-teacher-module/api/v1/teacher/educational-information/user/${userId}`
    );
  }

  static createTeacherEducationInformation(TeacherEducationInformation: TeacherEducationInformationRequestDto) {
    return authAxios.post(
      `/astanait-teacher-module/api/v1/teacher/educational-information/create`,
      TeacherEducationInformation
    );
  }

  static updateTeacherEducationInformation(
    TeacherEducationInformation: TeacherEducationInformationRequestDto,
    id: number
  ) {
    return authAxios.put(
      `/astanait-teacher-module/api/v1/teacher/educational-information/update/${id}`,
      TeacherEducationInformation
    );
  }

  static deleteTeacherEducationInformation(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/educational-information/delete/${id}`);
  }

  // 404 (not found)
  static getTeacherImage() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get(`/astanait-teacher-module/api/v1/teacher/image/${userId}`, { responseType: 'blob' });
  }

  static getTeacherImageById(userId: number) {
    return authAxios.get(`/astanait-teacher-module/api/v1/teacher/image/${userId}`, { responseType: 'blob' });
  }

  // 400 (bad request)
  static uploadTeacherCertificate(certificateData: any) {
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/certificate/upload`, certificateData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static getTeacherCertificates() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get(`/astanait-teacher-module/api/v1/teacher/certificate/user/${userId}`);
  }
  // 404 (not found)
  static uploadTeacherProfileImage(imageData: any) {
    console.log(imageData);
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/upload/image`, imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static updateTeacherInfo(teacherData: {}) {
    return authAxios.put(`/astanait-teacher-module/api/v1/teacher/update/teacher`, teacherData);
  }

  static getTeacherPublicInfoById(userId: number) {
    return axios.get(
      `${this.baseURL}/astanait-teacher-module/api/v1/teacher/pps/get-teacher-by-user-id?user_id=${userId}`
    );
  }

  static getTeacherInfoById(userId: number) {
    return authAxios.get(
      `${this.baseURL}/astanait-teacher-module/api/v1/teacher/get-teacher-by-user-id?user_id=${userId}`
    );
  }

  static getAllTeachersPublic(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return axios.get(`${this.baseURL}/astanait-teacher-module/api/v1/teacher/pps/get-all-teachers`, { params });
  }

  static getAllTeachers(params: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get(`${this.baseURL}/astanait-teacher-module/api/v1/teacher/get-all-teachers`, { params });
  }

  static getPublicTeacherDetail(id: number) {
    return axios.get(`${this.baseURL}/astanait-teacher-module/api/v1/teacher/pps/get-teacher-info?teacher_id=${id}`);
  }

  static getTeacherPrincipal() {
    return authAxios.get(`/astanait-teacher-module/api/v1/teacher/get-teacher-by-principal`);
  }

  static getTeacherDisciplines() {
    return authAxios.get<DisciplineDtoResponse[]>(
      `/astanait-office-module/api/v1/academic-department/discipline/get-disciplines-by-teacher-principal`
    );
  }

  static getGroupsByTeacherIdAndDisciplineId(disciplineId: number, year: number, term: number) {
    return authAxios.get<StudentGroupsDtoResponse[]>(
      `/astanait-student-module/api/v1/group/get-groups-by-discipline-and-teacher-principal?discipline_id=${disciplineId}&year=${year}&term=${term}`
    );
  }

  static getStudentsListByGroupIdAndDisciplineId(groupId: number, disciplineId: number) {
    return authAxios.get<StudentGroupsDtoResponse[]>(
      `/astanait-office-module/api/v1/academic-department/assessment-report/summary-sheet-by-discipline-and-group-for-teacher?discipline_id=${disciplineId}&group_id=${groupId}`
    );
  }

  static editStudentMark(gradeId: number, grade: number) {
    return authAxios.put(
      `/astanait-office-module/api/v1/academic-department/academic-stream-student-grade/update-grade-for-teacher?academic_stream_student_grade_id=${gradeId}&grade=${grade}`
    );
  }

  static getPositionsList() {
    return authAxios.get<TeacherPositionDtoResponce[]>(`/astanait-teacher-module/api/v1/teacher/positions`);
  }

  static getTypesList() {
    return authAxios.get<TeacherTypeDtoResponse[]>(`/astanait-teacher-module/api/v1/teacher/types`);
  }

  static getStatusList() {
    return authAxios.get<TeacherStatusDtoResponse[]>(`/astanait-teacher-module/api/v1/teacher/status`);
  }

  static getPlatformTypesList() {
    return authAxios.get<TeacherStatusDtoResponse[]>(
      `/astanait-teacher-module/api/v1/teacher/scholar-information/types`
    );
  }

  static getTeacherImagePublic(userId: number) {
    return axios.get(`${this.baseURL}/astanait-teacher-module/api/v1/teacher/pps/image/${userId}`, {
      responseType: 'blob',
    });
  }

  static getAcademicStreams() {
    return authAxios.get<AcademicStreamWithGroupsDtoResponse[]>(
      `/astanait-office-module/api/v1/academic-department/assessment-report/all-academic-stream`
    );
  }

  static updateTeacherForStream(teacherId: number, id: number) {
    return authAxios.put(
      `/astanait-office-module/api/v1/academic-department/assessment-report/update-teacher?teacherId=${teacherId}&id=${id}`
    );
  }

  static getWorkExp() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;

    return authAxios.get<TeacherWorkExpDto[]>(
      `/astanait-teacher-module/api/v1/teacher/work-experience/get-all?teacherId=${userId}`
    );
  }

  static updateWorkExp(id: number, TeacherWorkExpDto: TeacherWorkExpDto) {
    return authAxios.put(`/astanait-teacher-module/api/v1/teacher/work-experience/update/${id}`, TeacherWorkExpDto);
  }

  static deleteWorkExp(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/work-experience/delete/${id}`);
  }

  static createWorkExp(TeacherWorkExpDto: TeacherWorkExpDto) {
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/work-experience/create`, TeacherWorkExpDto);
  }

  static getDevelopments() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;

    return authAxios.get<TeacherDevelopmentsDtoResponse[]>(
      `/astanait-teacher-module/api/v1/teacher/developments/get-all?teacherId=${userId}`
    );
  }

  static getDevelopment(developmentId: number) {
    return downloadFile(
      `/astanait-teacher-module/api/v1/teacher/developments/data/${developmentId}`,
      'GET',
      'blob',
      'Development certificate',
      'pdf'
    );
  }

  static updateDevelopment(id: number, TeacherDevelopmentsDtoRequest: TeacherDevelopmentsDtoRequest) {
    return authAxios.put(
      `/astanait-teacher-module/api/v1/teacher/developments/update/${id}`,
      TeacherDevelopmentsDtoRequest.development
    );
  }

  static deleteDevelopment(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/developments/delete/${id}`);
  }

  static createDevelopment(TeacherDevelopmentsDtoRequest: TeacherDevelopmentsDtoRequest) {
    return authAxios.post(
      `/astanait-teacher-module/api/v1/teacher/developments/create`,
      TeacherDevelopmentsDtoRequest.development,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  }

  // 404 (not found)
  static getTeacherResume() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios({
      url: `/astanait-teacher-module/api/v1/teacher/resume/${userId}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileExtension = response.headers['content-disposition'].split('.')[1].slice(0, -1);
      link.setAttribute('download', `Resume.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
    });
  }

  static getTeacherResumeById(userId: number) {
    return authAxios({
      url: `/astanait-teacher-module/api/v1/teacher/resume/${userId}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileExtension = response.headers['content-disposition'].split('.')[1].slice(0, -1);
      link.setAttribute('download', `Resume.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
    });
  }

  static uploadResume(resumeData: any) {
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/upload/resume`, resumeData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static getDegrees() {
    return authAxios.get<AcademicDegreeDtoResponse[]>('/astanait-teacher-module/api/v1/teacher/pps/get-degrees');
  }

  static getDegreeList() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get<TeacherDegreeDtoResponse[]>(
      `/astanait-teacher-module/api/v1/teacher/degree/by-user/${userId}`
    );
  }

  static updateDegree(teacherDegreeDto: TeacherDegreeDtoRequest, degreeId: number) {
    return authAxios.put(
      `/astanait-teacher-module/api/v1/teacher/degree/update/${teacherDegreeDto.id}?degreeId=${degreeId}`,
      teacherDegreeDto.degreeFile
    );
  }

  static deleteDegree(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/degree/delete/${id}`);
  }

  static createDegree(teacherDegreeDto: TeacherDegreeDtoRequest, degreeId: number) {
    return authAxios.post(
      `/astanait-teacher-module/api/v1/teacher/degree/upload?degreeId=${degreeId}`,
      teacherDegreeDto.degreeFile
    );
  }

  static getEducationalDegreeById(id: number) {
    return authAxios.get<TeacherEducationalDegree>(`/astanait-teacher-module/api/v1/teacher/degree/type/${id}`);
  }

  static getEducationalFile(id: number) {
    return authAxios({
      url: `/astanait-teacher-module/api/v1/teacher/degree/data/${id}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileExtension = response.headers['content-disposition'].split('.')[1].slice(0, -1);
      link.setAttribute('download', `Degree file.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
    });
  }

  static getEducationalDegreesByType(id: number) {
    return authAxios.get<TeacherEducationalDegree[]>(`/astanait-teacher-module/api/v1/teacher/degree/list/${id}`);
  }

  static getLegalDocuments() {
    // @ts-ignore
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return authAxios.get<TeacherLegalDocsDtoResponce[]>(
      `/astanait-teacher-module/api/v1/teacher/legaldocs/by-user/${userId}`
    );
  }

  static getLedacDoc(id: number) {
    return authAxios({
      url: `/astanait-teacher-module/api/v1/teacher/legaldocs/data/${id}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileExtension = response.headers['content-disposition'].split('.')[1].slice(0, -1);
      link.setAttribute('download', `Security doc.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
    });
  }

  static getLegalDocTypes() {
    return authAxios.get<TeacherPatentTypeDtoResponse[]>(`/astanait-teacher-module/api/v1/teacher/legaldocs/types`);
  }

  static updateLegalDoc(legalDoc: TeacherLegalDocsDtoResponce, typeId: number) {
    return authAxios.put(
      `/astanait-teacher-module/api/v1/teacher/legaldocs/update/${legalDoc.id}?typeId=${typeId}`,
      legalDoc.file
    );
  }

  static createLegalDoc(legalDoc: TeacherLegalDocsDtoResponce, typeId: number) {
    return authAxios.post(`/astanait-teacher-module/api/v1/teacher/legaldocs/upload?typeId=${typeId}`, legalDoc.file);
  }

  static deleteLegalDoc(id: number) {
    return authAxios.delete(`/astanait-teacher-module/api/v1/teacher/legaldocs/delete/${id}`);
  }
}
