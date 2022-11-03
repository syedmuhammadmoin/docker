export class IBankStatementLines {
  id: number;
  reference: number;
  stmtDate: string;
  label: string;
  debit: number;
  credit: number;
  cumulativeBalance?: number;
}
