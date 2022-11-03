import { IJournalEntryLines } from "./IJournalEntryLines";

export interface IJournalEntry {
      id                : number;
      date              : string;
      description       : string;
      journalEntryLines : IJournalEntryLines[];
      isSubmit?         : any;
}
