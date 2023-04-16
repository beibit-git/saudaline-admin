import { SsciIndicatorsDtoResponse } from "./SsciIndicatorsDtoResponse";
import { SsciStudentEventDtoResponse } from "./SsciStudentEventDtoResponse";

export interface SsciStudentEventPointsDtoResponse {
    id: number;
    ssciStudentEvent: SsciStudentEventDtoResponse;
    ssciIndicators: SsciIndicatorsDtoResponse;
    points: number;
}