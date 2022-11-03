
import {State} from '@ngxs/store';
import { defaultEntityState, ProfilingState, ProfilingStateModel } from 'src/app/views/pages/profiling/store/profiling.state';

@State<ProfilingStateModel<any>>({
  name: 'City',
  defaults: defaultEntityState()
})
export class CityState extends ProfilingState<any> {
  constructor() {
    super(CityState, 'City');
  }
}

