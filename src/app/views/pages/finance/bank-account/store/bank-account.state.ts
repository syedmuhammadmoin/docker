
import {State} from '@ngxs/store';
import { defaultEntityState, ProfilingState, ProfilingStateModel } from 'src/app/views/pages/profiling/store/profiling.state';

@State<ProfilingStateModel<any>>({
  name: 'BankAccount',
  defaults: defaultEntityState()
})
export class BankAccountState extends ProfilingState<any> {
  constructor() {
    super(BankAccountState, 'BankAccount');
  }
}

