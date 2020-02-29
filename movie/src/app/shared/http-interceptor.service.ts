import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = {
  key: '41a05387eb63b24cc305b1c93b55c25f',
  url: 'https://api.themoviedb.org/3/',
};

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone = req.clone({
      url: `${API.url}${req.url}`,
      setParams: {
        api_key: API.key,
      }
    });
    return next.handle(clone);
  }
}
