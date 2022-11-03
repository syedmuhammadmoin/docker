import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../store/profiling.state";
import {State} from "@ngxs/store";

@State<ProfilingStateModel<any>>({
  name: 'WarehouseLocations',
  defaults: defaultEntityState()
})
export class WarehouseLocationState extends ProfilingState<any> {
  constructor() {
    super(WarehouseLocationState, 'WarehouseLocations');
  }
}
