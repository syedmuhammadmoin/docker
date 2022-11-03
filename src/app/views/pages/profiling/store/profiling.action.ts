import {EntityActionType, generateActionObject, ProfilingState} from './profiling.state';
import {Type} from '@angular/core';

export class GetList<T> {
  static readonly type = 'Get List'

  constructor(target: Type<ProfilingState<T>>, payload: any) {
    return generateActionObject(EntityActionType.getAll, target, payload);
  }
}

export class ReloadList<T> {
  static readonly type = 'Reload List'

  constructor(target: Type<ProfilingState<T>>, payload: any) {
    return generateActionObject(EntityActionType.reload, target, payload)
  }
}

export class AddEntity<T> {
  static readonly type = 'Add Entity'
  constructor(target: Type<ProfilingState<T>>, payload: any) {
    return generateActionObject(EntityActionType.addEntity, target, payload)
  }
}

export class IsLoading<T> {
  static readonly type = 'Is Loading'
  constructor(target: Type<ProfilingState<T>>, payload: any) {
    return generateActionObject(EntityActionType.setLoadingIndicator, target, payload)
  }
}

export class IsReloadRequired<T> {
  static readonly type = 'Is Reload Required'
  constructor(target: Type<ProfilingState<T>>, payload: any) {
    return generateActionObject(EntityActionType.isReloadRequired, target, payload)
  }
}
