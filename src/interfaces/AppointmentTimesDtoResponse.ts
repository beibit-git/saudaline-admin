import { AppointmentTimeDto } from "./AppointmentTimeDto";

export interface AppointmentTimesDtoResponse {
    time: string;
    status: string;
    appointment:AppointmentTimeDto;
    
  }