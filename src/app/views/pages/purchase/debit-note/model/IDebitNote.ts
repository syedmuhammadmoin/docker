import {IDebitNoteLines} from "./IDebitNoteLines";

export interface IDebitNote {
  id: number;
  vendorId: number;
  noteDate: string;
  documentLedgerId?: any;
  debitNoteLines: IDebitNoteLines[];
  isSubmit?: any;
}
