import {IGRNLines} from './IGRNLines'

export interface IGRN {
  id: number;
  vendorId: number;
  docDate: string;
  contact: number;
  goodsReceivingNoteLines: IGRNLines[];
  isSubmit?: any;
}



