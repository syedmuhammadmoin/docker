import {IBankStatementLines} from './IBankStatementLines';

export interface IBankStatement {
  id: number;
  bankAccountId: number;
  openingBalance: number;
  description: string;
  bankStmtLines: IBankStatementLines[]
}
