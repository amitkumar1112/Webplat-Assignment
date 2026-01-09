import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class SetInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedReq = this.handleRequest(req);
    return next.handle(clonedReq);
  }
  handleRequest(req: HttpRequest<any>) {
    let token = localStorage['token'] ? localStorage.getItem('token') : '';
    let authReq;

    let authorization: any = {
      Authorization: `Bearer ${token}`,
    };
    if (req.url.includes('profile')) {
      authReq = req.clone({
        headers: new HttpHeaders({ authorization }),
      });
    } else {
      authReq = req.clone({
        headers: new HttpHeaders({}),
      });
    }
    return authReq;
  }
}
