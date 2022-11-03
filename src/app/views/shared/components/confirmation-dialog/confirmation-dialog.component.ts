import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'kt-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ConfirmationDialogComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>,
  ) {
  }

  onClickCancel() {
    this.dialogRef.close(false);
  }

  onClickConfirm() {
    this.dialogRef.close(true);
  }

}
