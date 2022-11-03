import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../../profiling/store/profiling.state";
import {State} from "@ngxs/store";


@State<ProfilingStateModel<any>>({
  name: 'accountReceivables',
  defaults: defaultEntityState()
})
export class AccountReceivablesState extends ProfilingState<any> {
  constructor() {
    super(AccountReceivablesState, 'accountReceivables');
  }
}
