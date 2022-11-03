import { IDepartmentAccessLevel } from "./IDepartmentAccessLevel";

export interface IOrganizationAccessLevel {
  id: number;
  name: string;
  departments: IDepartmentAccessLevel[];
}


