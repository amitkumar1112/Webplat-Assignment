import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './dialog/logout/logout.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LogoutComponent],
  imports: [CommonModule, RouterModule, MatDialogModule],

  exports: [HeaderComponent, SidebarComponent],
})
export class SharedModule {}
