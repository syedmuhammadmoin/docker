import {ICreditNoteLines} from './ICreditNoteLines'

export interface ICreditNote {
  id: number;
  customerId: number;
  noteDate: string;
  documentLedgerId?: any
  creditNoteLines: ICreditNoteLines[];
  isSubmit?: any
}
