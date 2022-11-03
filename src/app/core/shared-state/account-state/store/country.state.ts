
import {State} from '@ngxs/store';
import { defaultEntityState, ProfilingState, ProfilingStateModel } from 'src/app/views/pages/profiling/store/profiling.state';

@State<ProfilingStateModel<any>>({
  name: 'Country',
  defaults: defaultEntityState()
})
export class CountryState extends ProfilingState<any> {
  constructor() {
    super(CountryState, 'Country');
  }
}

