import { DisciplineDtoResponse } from '../interfaces/DisciplineDtoResponse';
import { StudentGroupsDtoResponse } from '../interfaces/StudentGroupsDtoResponse';
import { TeachersListDtoResponse } from '../interfaces/TeachersListDtoResponse';
import authAxios from '../common/authAxios';
import { DisciplinesDtoResponse } from '../interfaces/DisciplinesDtoResponse';
import { EducationalProgramsDtoResponse } from '../interfaces/EducationalPrograms/EducationalProgramsDtoResponse';
import { TeacherDtoResponse } from '../interfaces/Teacher/TeacherDtoResponse';
import { downloadFile } from '../helpers/downloadFile';

export class VedomostiService {
  static getTeachersByDiscipline(disciplineId: number) {
    return authAxios.get(
      `/astanait-teacher-module/api/v1/teacher/get-teachers-by-discipline?discipline_id=${disciplineId}`
    );
  }

  static getGroupsByTeacherAndDiscipline(disciplineId: number, teacherId: number) {
    return authAxios.get(
      `/astanait-student-module/api/v1/group/get-groups-by-discipline-and-teacher?discipline_id=${disciplineId}&teacher_id=${teacherId}`
    );
  }

  static getAllTeachers() {
    return authAxios.get<TeachersListDtoResponse[]>(`/astanait-teacher-module/api/v1/teacher/get-all-teachers`);
  }

  static getAllDisciplines() {
    return authAxios.get<DisciplinesDtoResponse[]>(
      `/astanait-office-module/api/v1/academic-department/discipline/get-all-disciplines`
    );
  }

  static exportByTermAndGroup(group: number, term: number, year: number) {
    return downloadFile(
      `astanait-office-module/api/v1/academic-department/assessment-report/summary-sheet-by-term-and-group-in-excel?group_id=${group}&term=${term}&year=${year}`,
      'GET',
      'blob',
      `Vedomost ${term} ${year}`,
      'xlsx'
    );
  }

  static exportByFirstVedomost(params: any) {
    return downloadFile(
      `/astanait-office-module/api/v1/academic-department/assessment-report/summary-sheet-by-discipline-and-group-in-excel`,
      'GET',
      'blob',
      `Vedomost ${params.teacherId} ${params.disciplineId}`,
      'xlsx',
      params
    );
  }

  static exportByFirstVedomostEn(params: any) {
    return downloadFile(
      `/astanait-office-module/api/v1/academic-department/assessment-report/summary-sheet-by-discipline-and-group-in-excel/en`,
      'GET',
      'blob',
      `Statement ${params.teacherId} ${params.disciplineId}`,
      'xlsx',
      params
    );
  }

  static editStudentMark(grade_id: number, grade: number) {
    return authAxios.put(
      `/astanait-office-module/api/v1/academic-department/academic-stream-student-grade/update-grade?academic_stream_student_grade_id=${grade_id}&grade=${grade}`
    );
  }

  static editStudentMarkEmpty(grade_id: number, grade: number, student_id: number, grade_type: number) {
    return authAxios.put(
      `/astanait-office-module/api/v1/academic-department/academic-stream-student-grade/update-grade?academic_stream_student_grade_id=${grade_id}&grade=${grade}&academic_stream_student_id=${student_id}&academic_stream_grade_type=${grade_type}`
    );
  }

  static getEducationalProgramsByCourseAndDegree(course: number | undefined, degree: number | undefined) {
    return authAxios.get<EducationalProgramsDtoResponse[]>(
      `/astanait-office-module/api/v1/catalog/educational-program/by-filter?course=${course}&academicDegree=${degree}`
    );
  }

  static getEducationalProgramsByCourseAndDegreeWithGopId(
    course: number | undefined,
    degree: number | undefined,
    gopId: number
  ) {
    return authAxios.get<EducationalProgramsDtoResponse[]>(
      `/astanait-office-module/api/v1/catalog/educational-program/by-filter?course=${course}&academicDegree=${degree}&gopId=${gopId}`
    );
  }

  static getGroupsByCourseAndEducationalProgram(course: number | undefined, educationalProgram: number | undefined) {
    return authAxios.get<StudentGroupsDtoResponse[]>(
      `/astanait-student-module/api/v1/group/get-groups-by-course-and-educational-program?education_program_id=${educationalProgram}&course=${course}`
    );
  }

  static getDisciplinesByFilter(year: number | undefined, term: number | undefined, groupId: number | undefined) {
    return authAxios.get<DisciplineDtoResponse[]>(
      `/astanait-office-module/api/v1/academic-department/discipline/by-filter?year=${year}&term=${term}&groupId=${groupId}`
    );
  }

  static getTeachersByFilter(
    year: number | undefined,
    term: number | undefined,
    groupId: number | undefined,
    disciplineId: number | undefined
  ) {
    return authAxios.get<TeacherDtoResponse[]>(
      `/astanait-teacher-module/api/v1/teacher/by-filter?year=${year}&term=${term}&groupId=${groupId}&disciplineId=${disciplineId}`
    );
  }

  static getVedomostForOffice(params?: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }
    return authAxios.get(`/astanait-office-module/api/v1/academic-department/assessment-report/by-filter`, { params });
  }

  static getDisciplineByTeacher(year: number | undefined, term: number | undefined) {
    return authAxios.get<DisciplineDtoResponse[]>(
      `/astanait-office-module/api/v1/academic-department/discipline/by-teacher?year=${year}&term=${term}`
    );
  }

  static getVedomostForTeacher(
    year: number | undefined,
    term: number | undefined,
    groupId: number | undefined,
    disciplineId: number | undefined
  ) {
    return authAxios.get(
      `/astanait-office-module/api/v1/academic-department/assessment-report/by-teacher?year=${year}&term=${term}&groupId=${groupId}&disciplineId=${disciplineId}`
    );
  }

  static approveByTeacher(
    studentIds: number[],
    status: boolean,
    year: number | undefined,
    term: number | undefined,
    groupId: number | undefined,
    disciplineId: number | undefined,
    reason?: string
  ) {
    return authAxios.put(
      `/astanait-office-module/api/v1/academic-department/assessment-report/approve?students=${studentIds}&status=${status}&reason=${reason}&year=${year}&term=${term}&groupId=${groupId}&disciplineId=${disciplineId}`
    );
  }

  static getAcademicRating(params?: any) {
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }

    return authAxios.get(`/astanait-office-module/api/v1/academic-department/assessment-report/get-students-with-gpa`, {
      params,
    });
  }

  static exportAcademicRatingInExcel(params?: any) {
    return downloadFile(
      `/astanait-office-module/api/v1/academic-department/assessment-report/get-students-with-gpa-in-excel`,
      'GET',
      'blob',
      `Academic rating list`,
      'xlsx',
      params
    );
  }
}
