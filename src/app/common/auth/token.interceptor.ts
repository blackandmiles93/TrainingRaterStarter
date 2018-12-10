import { AuthService } from "./auth.service";
import { Injector, Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.authService) {
      this.authService = this.injector.get(AuthService);
    }
    const token = this.authService.token;

    console.log(token);

    if (token) {
      const headers = {
        Authorization: token
      };
      const dupRequest = request.clone({
        setHeaders: headers
      });
      return next.handle(dupRequest);
    } else {
      return next.handle(request);
    }
  }
}
