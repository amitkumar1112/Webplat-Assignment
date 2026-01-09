import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { LogoutComponent } from '../dialog/logout/logout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public dialog: MatDialog, private _router: Router) {}
  sidebarArray = [
    { label: 'Dashboard', url: '/profile' },
    { label: 'Product Page', url: '/product' },
    { label: 'User Page', url: '/user' },
  ];

  settingBar = [
    { label: 'Setting', icon: 'assets/images/Group_254.png', url: '/setting' },
    { label: 'Help', icon: 'assets/images/Group_256.png', url: '/help' },
    { label: 'logout', icon: 'assets/images/Group_255.png' },
  ];

  navigate(label: string): void {
    if (label == 'logout') {
      const dialogRef = this.dialog.open(LogoutComponent);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          localStorage.clear();
          this._router.navigate(['/auth/login']);
        }
      });
    }
  }
}
