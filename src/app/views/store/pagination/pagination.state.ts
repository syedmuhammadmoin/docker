import {Type} from '@angular/core';
import {createSelector, StateContext} from '@ngxs/store';
import {EntityActionType, ProfilingState,} from '../../pages/profiling/store/profiling.state';

export function defaultEntityState<T>(
  defaults: Partial<PaginationStateModel> = {}
): PaginationStateModel {
  return {
    pageNumber: 1,
    ...defaults
  };
}


export class PaginationStateModel {
  pageNumber: number;
}

export abstract class PaginationState<T extends {}>{

  private readonly idKey: string;
  private readonly storePath: string;

  protected constructor(
    storeClass: Type<PaginationState<T>>,
    _idKey: keyof T,
  ) {
    this.idKey = _idKey as string;
    this.storePath = storeClass['NGXS_META'].path;

    this.setup(storeClass, Object.values(EntityActionType));
  }

  static get pageNumber(): StateSelector<any> {
    return createSelector([this], state => {
      return state.pageNumber;
    });
  }

  getPageNumber({getState, setState}: StateContext<PaginationStateModel>, payload: any){
    const state = getState();
    if (payload) {
      const lastPageNumber = localStorage.getItem(payload.payload.pageName);
      setState({
        ...state,
        pageNumber: +lastPageNumber
      })
    }
  }

  setPageNumber({getState, setState}: StateContext<PaginationStateModel>, payload: any){
    const state = getState();
    if (payload) {
      localStorage.setItem(payload.payload.pageName, payload.payload.pageNumber)
      setState({
        ...state,
        pageNumber: payload.payload.pageNumber
      })
    }
  }

/*
  getAll({getState, setState}: StateContext<PaginationStateModel>, payload: any) {
    const serviceClass = payload.payload.serviceClass
    const methodName = payload.payload.methodName

    const state = getState();
    if (payload) {
      serviceClass[methodName]().subscribe((res) => {
        setState({
          ...state,
          pageNumber: 0
        })
      })
    }
  }
*/

/*
  addEntity({setState}: StateContext<PaginationStateModel>, payload: any) {
    const serviceClass = payload.payload.serviceClass;
    const methodName = payload.payload.methodName

    serviceClass[methodName](payload.payload.entity).subscribe((res) => {
      setState(
        // @ts-ignore
        patch({
          pageNumber: 0
        })
      )
    })
  }
*/

  private setup(storeClass: Type<PaginationState<T>>, actions: string[]) {
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

export declare type StateSelector<T> = (state: PaginationStateModel) => T;

