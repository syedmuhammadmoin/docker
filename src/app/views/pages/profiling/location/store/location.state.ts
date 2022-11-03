import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../store/profiling.state";
import {State} from "@ngxs/store";

@State<ProfilingStateModel<any>>({
  name: 'Location',
  defaults: defaultEntityState()
})
export class LocationState extends ProfilingState<any> {
  constructor() {
    super(LocationState, 'Location');
  }
}
