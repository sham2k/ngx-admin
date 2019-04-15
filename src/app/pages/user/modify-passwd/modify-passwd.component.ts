import { Component, OnInit } from "@angular/core";
import { UserService, DialogWindowService } from "../../../services";

/**
 * 修改登录密码
 */
@Component({
  selector: "ngx-modify-passwd",
  templateUrl: "./modify-passwd.component.html",
  styleUrls: ["./modify-passwd.component.scss"]
})
export class ModifyPasswdComponent implements OnInit {
  messages: string = "";
  submitted: boolean = false;
  curpwd: string = "";
  newpwd1: string = "";
  newpwd2: string = "";

  constructor(
    private userService: UserService,
    private dialog: DialogWindowService
  ) {}

  ngOnInit() {}

  /**
   * 调用修改密码
   */
  submit() {
    this.messages = "正在认证身份...";
    this.userService.modifyPasswd(
      this.curpwd,
      this.newpwd1,
      this.succCallback,
      this.failCallback
    );
  }

  /**
   * 修改密码成功应答
   */
  succCallback = message => {
    this.dialog.message("恭喜您，登录密码修改成功啦！");
    history.back();
  };

  /**
   * 修改密码失败应答
   */
  failCallback = message => {
    this.messages = message.rtn_mesg;
    this.submitted = false;
  };
}
