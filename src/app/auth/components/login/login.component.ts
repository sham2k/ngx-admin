import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "../../../services";
import { UserService } from "../../../services";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  messages: string;
  submitted: boolean = false;
  user: any = {};

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private router: Router
  ) {
    this.messages = "";
    this.user.user_code = "user0001";
    this.user.passwd = "pwd0001";
  }

  /**
   * 调用登录服务
   */
  login() {
    this.messages = "正在认证身份...";
    this.userService.login(
      this.user.user_code,
      this.user.passwd,
      this.loginCallback,
      this.failCallback
    );
  }

  /**
   * 登录成功应答
   */
  loginCallback = message => {
    this.configService.userLogin = true;
    this.configService.currentUser = message.biz_datas.user;
    this.configService.accessKey = message.biz_datas.user.user_id;
    this.configService.tokenKey = message.biz_datas.token;
    this.configService.secretKey = this.userService.createSecretKey(
      message.biz_datas.user.user_id,
      this.user.user_code,
      this.user.passwd,
      this.configService.tokenKey
    );
    this.router.navigateByUrl("pages/dashboard");
  };

  /**
   * 登录失败应答
   */
  failCallback = message => {
    this.messages = message.rtn_mesg;
    this.submitted = false;
  };

  /**
   * 注册新用户
   */
  register() {
    this.router.navigateByUrl("auth/register");
  }
}
