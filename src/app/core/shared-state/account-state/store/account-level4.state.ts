
import {State} from '@ngxs/store';
import { defaultEntityState, ProfilingState, ProfilingStateModel } from 'src/app/views/pages/profiling/store/profiling.state';

@State<ProfilingStateModel<any>>({
  name: 'AccountLevel4',
  defaults: defaultEntityState()
})
export class AccountLevel4State extends ProfilingState<any> {
  constructor() {
    super(AccountLevel4State, 'AccountLevel4');
  }
}

