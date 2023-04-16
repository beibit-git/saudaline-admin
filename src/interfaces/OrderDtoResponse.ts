import { OrderTypeDtoResponse } from "./OrderTypeDtoResponse";

export interface OrderDtoResponse {
    id: number;
    orderType: OrderTypeDtoResponse;
    number: string;
    issueDate: Date;
    name: string;
    owner: number;
    fileId: number;
    contingateDate: Date;
    createdDate: Date;
    updatedDate: Date;
}