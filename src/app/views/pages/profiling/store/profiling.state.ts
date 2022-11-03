import {createSelector, StateContext, StateOperator} from '@ngxs/store';


import {Type} from '@angular/core';
import {insertItem, patch} from '@ngxs/store/operators';


export function defaultEntityState<T>(
  defaults: Partial<ProfilingStateModel<T>> = {}
): ProfilingStateModel<T> {
  return {
    modelList: [],
    isFetchCompleted: false,
    isLoading: true,
    ...defaults
  };
}

export class ProfilingStateModel<T> {
  modelList: T[];
  isFetchCompleted: boolean;
  isLoading: boolean;
}

export abstract class ProfilingState<T extends {}> {

  private readonly idKey: string;
  private readonly storePath: string;

  // protected readonly idGenerator: IdGenerator<T>;


  protected constructor(
    storeClass: Type<ProfilingState<T>>,
    _idKey: keyof T,
  ) {
    this.idKey = _idKey as string;
    this.storePath = storeClass['NGXS_META'].path;

    this.setup(storeClass, Object.values(EntityActionType));
  }

  static get entities(): StateSelector<any> {
    return createSelector([this], state => {
      return state.modelList;
    });
  }

  static get isFetchCompleted(): StateSelector<any> {
    return createSelector([this], state => {
      return state.isFetchCompleted;
    });
  }

  static get isLoading(): StateSelector<any> {
    return createSelector([this], state => {
      return state.isLoading;
    })
  }

  getAll({getState, setState}: StateContext<ProfilingStateModel<T>>, payload: any) {
    const serviceClass = payload.payload.serviceClass
    const methodName = payload.payload.methodName

    const state = getState();
    if (payload) {
      serviceClass[methodName]().subscribe((res) => {
        setState({
          ...state,
          isFetchCompleted: true,
          modelList: res && res.result ? res.result : res,
          isLoading: false
        })
      })
    }
  }

  reload({setState}: StateContext<ProfilingStateModel<T>>, payload: any) {
    setState(getRecords(payload))
  }

  addEntity({setState}: StateContext<ProfilingStateModel<T>>, payload: any) {
    const serviceClass = payload.payload.serviceClass;
    const methodName = payload.payload.methodName

    serviceClass[methodName](payload.payload.entity).subscribe((res) => {
      setState(
        // @ts-ignore
        patch({
          modelList: insertItem(res, 0),
          isLoading: false
        })
      )
    })
  }

  setLoadingIndicator({setState}: StateContext<ProfilingStateModel<T>>, payload: any) {
    setState(
      setLoading(payload)
    )
  }

  isReloadRequired({setState}: StateContext<ProfilingStateModel<T>>, payload: any) {
    setState(setIsReloadRequired(payload))
    /*const state = getState();
    setState(
      // @ts-ignore
      patch({
        ...state,
        isFetchCompleted: false
      })
    )*/
  }


  private setup(storeClass: Type<ProfilingState<T>>, actions: string[]) {
    // validation if a matching action handler exists has moved to reflection-validation tests
    actions.forEach(fn => {
      const actionName = `[${this.storePath}] ${fn}`;
      storeClass['NGXS_META'].actions[actionName] = [
        {
          fn,
          options: {},
          type: actionName
        }
      ];
    });
  }
}

export enum EntityActionType {
  getAll = 'getAll',
  reload = 'reloadAll',
  addEntity = 'addEntity',
  setLoadingIndicator = 'setLoadingIndicator',
  isReloadRequired = 'isReloadRequired',
  getPageNumber = 'getPageNumber',
  setPageNumber = 'setPageNumber'
}

export function setLoading<T>(payload: any): StateOperator<ProfilingStateModel<T>> {
  return (state: ProfilingStateModel<T>) => {
    return {
      ...state,
      isLoading: payload.payload
    }
  }
}

export function getRecords<T>(payload: { serviceClassName: any, methodName: any, context: any }): StateOperator<ProfilingStateModel<T>> {
  return (state: ProfilingStateModel<T>) => {
    const entities = [];
    return {
      ...state,
      modelList: entities,
      isFetchCompleted: true
    }
  }
}

export function setIsReloadRequired<T>(payload): StateOperator<ProfilingStateModel<T>> {
  return (state: ProfilingStateModel<T>) => {
    return {
      ...state,
      isFetchCompleted: !(payload.payload)
    }
  }
}

export declare type StateSelector<T> = (state: ProfilingStateModel<any>) => T;


export function generateActionObject<T>(
  fn: string,
  store: Type<T>,
  payload?: any
) {
  const name = store['NGXS_META'].path;
  const ReflectedAction = function (data: T) {
    this.payload = data;
  };
  const obj = new ReflectedAction(payload);
  Reflect.getPrototypeOf(obj).constructor['type'] = `[${name}] ${fn}`;
  return obj;
}
