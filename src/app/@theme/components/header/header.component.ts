import { Component, Input, OnInit } from "@angular/core";

import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { UserData } from "../../../@core/data/users";
import { AnalyticsService } from "../../../@core/utils";
import { ConfigService } from "../../../services";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  @Input() position = "normal";

  user: any;

  userMenu = [
    {
      title: "我的资料",
      icon: "nb-compose",
      link: "/pages/user/user-view"
    },
    {
      title: "修改密码",
      icon: "nb-locked",
      link: "/pages/user/modify-passwd"
    },
    {
      title: "退出登录",
      icon: "ion-log-out",
      link: "/pages/user/logout"
    }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private configService: ConfigService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    if (this.configService.userLogin) {
      this.user = this.configService.currentUser;
    } else {
      this.user = {
        name: "请登录"
      };
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent("startSearch");
  }
}
