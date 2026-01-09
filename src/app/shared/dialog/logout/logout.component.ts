import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private _dialogRef: MatDialogRef<LogoutComponent>) {}

  logout(): void {
    this._dialogRef.close(true);
  }
}
