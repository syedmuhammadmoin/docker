import { IUserRole } from "./IUserRole";

export interface IUserModel {
    id?: any
    userName?: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    userRole: IUserRole[];
}
