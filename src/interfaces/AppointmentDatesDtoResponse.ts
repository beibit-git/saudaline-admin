import { AppointmentTimesDtoResponse } from "./AppointmentTimesDtoResponse";

export interface AppointmentDatesDtoResponse {
    date: Date;
    weekDay: string;
    times:AppointmentTimesDtoResponse[];
    studentFIO: string;
    dateTime: Date;
    group: string;
    statusTitle:string;
    
  }
  