import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../components/confirmation-dialog/confirmation-dialog.component';
import {Injectable} from "@angular/core";

export interface FormsCanDeactivate {
  canDeactivate(): boolean | Observable<boolean>;
}

export const CanDeactivateState = {
  defendAgainstBrowserBackButton: false,
};

@Injectable({
  providedIn: 'root'
})
export class FormConfirmationGuard implements FormsCanDeactivate {
  constructor(readonly matDialog: MatDialog) {
  }

  // @ts-ignore
  canDeactivate(component: FormsCanDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate() ||
      this.matDialog.open<ConfirmationDialogComponent, void, boolean>(ConfirmationDialogComponent, {
        disableClose: true,
        width: '500px',

      }).afterClosed().pipe(
        tap(confirmed => {
          if (!confirmed && CanDeactivateState.defendAgainstBrowserBackButton) {
            history.pushState(null, '', '');
          }
        })
      );
  }
}



