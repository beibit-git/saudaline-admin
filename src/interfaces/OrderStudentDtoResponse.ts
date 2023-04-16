import { OrderDtoResponse } from "./OrderDtoResponse";
import { StudentDtoResponse } from "./StudentDtoResponse";

export interface OrderStudentDtoResponse {
    order: OrderDtoResponse;
    students : StudentDtoResponse[];
}