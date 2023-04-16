import authAxios from '../common/authAxios';
import {
  SummarySheetForTranscriptWithTrimesters,
  TranscriptGpaDtoResponse,
} from '../interfaces/SummarySheetForTranscriptDtoResponse';
import { StudentGroupsDtoResponse } from '../interfaces/StudentGroupsDtoResponse';
import { StudentDtoResponse } from '../interfaces/StudentDtoResponse';
import { downloadFile } from '../helpers/downloadFile';

export class TranscriptService {
  static getSummarySheetForTranscriptAcademDep(userId: number) {
    return authAxios.get<SummarySheetForTranscriptWithTrimesters>(
      `/astanait-office-module/api/v1/academic-department/assessment-report/summary-sheet-by-for-transcript?user_id=${userId}`
    );
  }

  static getStudentByName(studentFullname: string) {
    return authAxios.get<StudentDtoResponse[]>(
      `/astanait-student-module/api/v1/student/get-student-by-fullname-matches?name=${studentFullname}`
    );
  }

  static async getStudentById(id: number | undefined) {
    return await authAxios.get<StudentDtoResponse[]>(
      `/astanait-student-module/api/v1/student/get-student-by-id?student_id=${id}`
    );
  }

  static getAllStudentsGroup() {
    return authAxios.get<StudentGroupsDtoResponse[]>(`/astanait-student-module/api/v1/group/get-all`);
  }

  static getStudentsByGroupForTranscript(groupId: number | undefined) {
    return authAxios.get<StudentDtoResponse[]>(
      `/astanait-student-module/api/v1/student/get-student-by-group?group_id=${groupId}`
    );
  }

  static getSummarySheetForTranscriptStudent() {
    return authAxios.get<SummarySheetForTranscriptWithTrimesters>(
      'astanait-office-module/api/v1/academic-department/assessment-report/summary-sheet-by-for-transcript-for-student'
    );
  }

  static getSummarySheetForTranscriptPdf(studentId: number | undefined, studentFullname: string) {
    return downloadFile(
      `/astanait-office-module/api/v1/academic-department/assessment-report/summary-sheet-by-for-transcript-by-pdf?user_id=${studentId}`,
      'GET',
      'blob',
      `${studentId} - ${studentFullname}`,
      'pdf'
    );
  }

  static getTranscriptGpaForTrimestersWithAverage(studentId: number) {
    return authAxios.get<TranscriptGpaDtoResponse>(
      `astanait-office-module/api/v1/academic-department/assessment-report/transcript-gpa?user_id=${studentId}`
    );
  }

  static getTranscriptGpaForTrimestersWithAverageForStudents() {
    return authAxios.get<TranscriptGpaDtoResponse>(
      'astanait-office-module/api/v1/academic-department/assessment-report/transcript-gpa-for-student'
    );
  }

  static getStudentsGroupByCourseAndEp(course: number | undefined, educationalProgramId: number) {
    return authAxios.get<StudentGroupsDtoResponse[]>(
      `/astanait-student-module/api/v1/group/get-groups-by-course-and-education-program?course=${course}&education_program_id=${educationalProgramId}`
    );
  }
}
