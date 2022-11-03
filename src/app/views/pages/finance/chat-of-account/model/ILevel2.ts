import {ILevel1} from './ILevel1';

export interface ILevel2 {
  id: number;
  name: string;
  code: string;
  level1_Id: number;
  // level1?: ILevel1;
}

