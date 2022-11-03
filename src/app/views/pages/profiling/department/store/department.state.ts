import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../store/profiling.state";
import {State} from "@ngxs/store";

@State<ProfilingStateModel<any>>({
  name: 'Department',
  defaults: defaultEntityState()
})
export class DepartmentState extends ProfilingState<any> {
  constructor() {
    super(DepartmentState, 'Department');
  }
}
