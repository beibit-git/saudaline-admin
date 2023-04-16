import { RoleDtoResponse } from "./RoleDtoResponse";

export interface UserDtoResponse{
    id: number;
    username: string;
    name: string;
    surname: string;
    baseRole: string;
    roleList: RoleDtoResponse[];
}
