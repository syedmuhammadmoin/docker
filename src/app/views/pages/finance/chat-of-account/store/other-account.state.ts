import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../../profiling/store/profiling.state";
import {State} from "@ngxs/store";

@State<ProfilingStateModel<any>>({
  name: 'otherAccounts',
  defaults: defaultEntityState()
})
export class OtherAccountState extends ProfilingState<any>{
  constructor() {
    super(OtherAccountState, 'otherAccounts');
  }
}
