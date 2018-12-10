import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ToastsManager } from "ng2-toastr";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastsManager: ToastsManager
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.toastsManager.error("Please Login");
      this.router.navigate(["login"]);
    }
    return Observable.of(isAuthenticated);
  }
}
