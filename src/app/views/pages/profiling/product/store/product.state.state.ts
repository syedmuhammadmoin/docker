import {defaultEntityState, ProfilingState, ProfilingStateModel} from "../../store/profiling.state";
import {State} from "@ngxs/store";

@State<ProfilingStateModel<any>>({
  name: 'Product',
  defaults: defaultEntityState()
})
export class ProductState extends ProfilingState<any> {
  constructor() {
    super(ProductState, 'Product');
  }
}
