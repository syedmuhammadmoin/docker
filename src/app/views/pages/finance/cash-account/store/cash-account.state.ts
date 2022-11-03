import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../../profiling/store/profiling.state";
import {State} from "@ngxs/store";


@State<ProfilingStateModel<any>>({
  name: 'CashAccount',
  defaults: defaultEntityState()
})
export class CashAccountState extends ProfilingState<any>{
  constructor() {
    super(CashAccountState, 'CashAccount');
  }
}
