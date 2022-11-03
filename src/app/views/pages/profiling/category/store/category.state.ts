import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../store/profiling.state";
import {State} from "@ngxs/store";

@State<ProfilingStateModel<any>>({
  name: 'Category',
  defaults: defaultEntityState()
})
export class CategoryState extends ProfilingState<any> {
  constructor() {
    super(CategoryState, 'Category');
  }
}
