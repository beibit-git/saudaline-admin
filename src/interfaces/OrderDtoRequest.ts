export interface OrderDtoRequest {
  orderType: number;
  number: string;
  issueDate: Date;
  name: string;
  issued: boolean;
  contingateDate: Date;
}
