import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "../../../services";
import { UserService } from "../../../services";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  messages: string;
  submitted: boolean = false;

  userCode: string;
  userName: string;
  passwd1: string;
  passwd2: string;
  mobile: string;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private router: Router
  ) {
    this.messages = "";
  }

  /**
   * 调用注册服务
   */
  register() {
    this.messages = "正在注册用户...";
    this.userService.register(
      this.userCode,
      this.userName,
      this.passwd1,
      this.mobile,
      this.registerCallback,
      this.failCallback
    );
  }

  /**
   *注册成功应答
   */
  registerCallback = message => {
    this.configService.userLogin = true;
    this.configService.currentUser = message.exts.user;
    this.configService.tokenKey = message.exts.token;
    this.configService.secretKey = this.userService.restoreSecretKey(
      this.userCode,
      this.passwd1,
      message.exts.secret_key
    );
    this.router.navigateByUrl("pages/dashboard");
  };

  /**
   * 注册失败应答
   */
  failCallback = message => {
    this.messages = message.rtn_mesg;
    this.submitted = false;
  };
}
