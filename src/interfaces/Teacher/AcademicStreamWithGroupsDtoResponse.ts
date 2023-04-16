import { DisciplineDtoResponse } from "../DisciplineDtoResponse";

export interface AcademicStreamWithGroupsDtoResponse{
    id: number;
    year: number;
    term: number;
    teacherId: number;
    disciplineDtoResponse: DisciplineDtoResponse;
    groups: string[];
}