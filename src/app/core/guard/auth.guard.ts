import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (next.routeConfig?.path === '' || next.routeConfig?.path === 'auth') {
      if (token === '' || token == null) {
        this.router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}
