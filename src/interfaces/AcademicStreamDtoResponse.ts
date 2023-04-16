import { DisciplineDtoResponse } from "./DisciplineDtoResponse";
import { StreamTypeDtoResponse } from "./StreamTypeDtoResponse";
import { TeacherDtoResponse } from "./Teacher/TeacherDtoResponse";

export interface AcademicStreamDtoResponse {
  teacher: TeacherDtoResponse;
  discipline: DisciplineDtoResponse;
  senior: boolean;
  streamStartedDate: Date;
  streamEndedDate: Date;
  term: number;
  streamName: String;
  // Указывает на то, практика ли это, или же лекция
  streamType: StreamTypeDtoResponse;
}