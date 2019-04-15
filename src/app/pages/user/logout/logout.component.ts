import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService, DialogWindowService } from "../../../services";

@Component({
  selector: "ngx-logout",
  template: ``
})
export class LogoutComponent {
  constructor(
    configService: ConfigService,
    dialog: DialogWindowService,
    router: Router
  ) {
    dialog.question(
      "确认要退出登录么?",
      () => {
        configService.userLogin = false;
        configService.currentUser = null;
        router.navigateByUrl("auth/login");
      },
      () => {
        history.back();
      }
    );
  }
}
