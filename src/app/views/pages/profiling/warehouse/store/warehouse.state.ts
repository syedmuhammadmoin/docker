import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../store/profiling.state";
import {State} from "@ngxs/store";

@State<ProfilingStateModel<any>>({
  name: 'Warehouse',
  defaults: defaultEntityState()
})
export class WarehouseState extends ProfilingState<any> {
  constructor() {
    super(WarehouseState, 'Warehouse');
  }
}
