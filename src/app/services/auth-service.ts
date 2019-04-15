import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config-service';
import { DialogWindowService } from './dialog-window';

import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private configService: ConfigService,
    private dialog: DialogWindowService,
  ) {}

  /**
   * 登录状态及权限检查
   */
  check(): Observable<boolean> {
    return new Observable(observer => {
      if (
        this.configService.userLogin &&
        this.configService.currentUser != null
      ) {
        // TODO: 检查权限
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
        observer.complete();
        this.router.navigateByUrl('auth/login');
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.check();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.check();
  }

  checkLogin(): boolean {
    if (
      this.configService.userLogin &&
      this.configService.currentUser != null
    ) {
      return true;
    } else {
      this.dialog.error('您还没有登录呢，请先登录！', 'auth/login');
      return false;
    }
  }
}
