import {defaultEntityState, ProfilingState, ProfilingStateModel} from '../../../profiling/store/profiling.state';
import {State} from "@ngxs/store";


@State<ProfilingStateModel<any>>({
  name: 'accountPayable',
  defaults: defaultEntityState()
})
export class PayableAccountState extends ProfilingState<any>{
  constructor() {
    super(PayableAccountState, 'accountPayable');
  }
}
