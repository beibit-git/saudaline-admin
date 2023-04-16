import { AcademicStreamDtoResponse } from "./AcademicStreamDtoResponse";
import { AcademicStreamStudentGradeDtoResponse } from "./AcademicStreamStudentGradeDtoResponse";

// Получаю лист из этих объектов
export interface SummarySheetForTranscriptDtoResponse {
  academicStreamStudentId: number;
  academicStream: AcademicStreamDtoResponse;
  // 1 элемент массива - РК1, 2 элемент - РК2, 3 элемент - Оценка за фйнал
  academicStreamStudentGrade: AcademicStreamStudentGradeDtoResponse[];
  alphabeticGrade: string;
  gpaGrade: number;
  traditionalGradeRu: string;
  traditionalGrade: string;
}

export interface SummarySheetForTranscriptWithTrimesters {
  1: SummarySheetForTranscriptDtoResponse[],
  2: SummarySheetForTranscriptDtoResponse[],
  3: SummarySheetForTranscriptDtoResponse[],
  4: SummarySheetForTranscriptDtoResponse[],
  5: SummarySheetForTranscriptDtoResponse[],
  6: SummarySheetForTranscriptDtoResponse[],
  7: SummarySheetForTranscriptDtoResponse[],
  8: SummarySheetForTranscriptDtoResponse[],
  9: SummarySheetForTranscriptDtoResponse[],
  0: SummarySheetForTranscriptDtoResponse[],
};

export interface TranscriptGpaDtoResponse {
  gpaOfTrimesters: { [trimester: string]: number };
  averageGpa: number;
}