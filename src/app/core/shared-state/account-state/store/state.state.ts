
import {State} from '@ngxs/store';
import { defaultEntityState, ProfilingState, ProfilingStateModel } from 'src/app/views/pages/profiling/store/profiling.state';

@State<ProfilingStateModel<any>>({
  name: 'State',
  defaults: defaultEntityState()
})
export class StateState extends ProfilingState<any> {
  constructor() {
    super(StateState, 'State');
  }
}

