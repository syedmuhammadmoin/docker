import {IDispatchNoteLines} from './IDispatchNoteLines';

export interface IDispatchNote {
  id: number;
  customerId: number;
  docDate: string;
  goodsDispatchNoteLines: IDispatchNoteLines[];
  isSubmit?: any;
}
