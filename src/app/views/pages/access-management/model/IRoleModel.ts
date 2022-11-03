import { IOrganizationAccessLevel } from "./IOrganizationAccessLevel";
import { IRoleClaim } from "./IRoleClaim";

export interface IRoleModel {
    id: any;
    roleName: string;
    roleClaims: IRoleClaim[];
    //locationIds: number[];
    //userScope?: IOrganizationAccessLevel[] 
}