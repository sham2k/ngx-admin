import { Injectable } from "@angular/core";
import { HttpService } from "./http-service";
import { HttpXsrfTokenExtractor } from "@angular/common/http";
import { MessageService } from "./message-service";
import { ConfigService } from "./config-service";
import { AuthService } from "./auth-service";
import * as CryptoJS from "crypto-js/index.js";

/**
 * 用户管理服务
 */
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  /**
   * 用户注册
   * @param userCode
   * @param userName
   * @param password
   * @param mobile
   * @param succCallback
   * @param failCallback
   */
  register(
    userCode: string,
    userName: string,
    password: string,
    userMobile: string,
    succCallback: Function,
    failCallback?: Function
  ) {
    const encPasswd = CryptoJS.SHA256(userCode + password).toString();
    const request = this.messageService.createRequest({
      trns_type: "dfmp.600",
      exts: {
        user_code: userCode,
        user_name: userName,
        passwd: encPasswd,
        mobile: userMobile
      }
    });
    return this.httpService.callService(request, succCallback, failCallback);
  }

  /**
   * 用户登录
   * @param userCode
   * @param password
   * @param succCallback
   * @param failCallback
   */
  login(
    userCode: string,
    password: string,
    succCallback: Function,
    failCallback?: Function
  ) {
    const encPasswd = CryptoJS.SHA256(userCode + password).toString();
    const request = this.messageService.createRequest({
      trns_type: "cams.901",
      biz_datas: {
        user_code: userCode,
        passwd: encPasswd
      }
    });
    return this.httpService.callService(request, succCallback, failCallback);
  }

  /**
   * 修改登录密码。
   * @param oldPasswd
   * @param newPasswd
   * @param succCallback
   * @param failCallback
   */
  modifyPasswd(
    oldPasswd: string,
    newPasswd: string,
    succCallback: Function,
    failCallback?: Function
  ) {
    // 检查登录状态
    if (!this.authService.checkLogin()) return;
    const encOldPasswd = CryptoJS.SHA256(
      this.configService.currentUser.user_code + oldPasswd
    ).toString();
    const encNewPasswd = CryptoJS.SHA256(
      this.configService.currentUser.user_code + newPasswd
    ).toString();
    const request = this.messageService.createRequest({
      trns_type: "dfmp.602",
      biz_datas: {
        user_id: this.configService.currentUser.user_id,
        old_passwd: encOldPasswd,
        new_passwd: encNewPasswd
      }
    });
    return this.httpService.callService(request, succCallback, failCallback);
  }

  /**
   * 更新用户资料
   * @param userInfo
   * @param succCallback
   * @param failCallback
   */
  modifyUserInfo(
    userInfo: any,
    succCallback: Function,
    failCallback?: Function
  ) {
    const request = this.messageService.createRequest({
      trns_type: "dfmp.603",
      biz_datas: {
        user: userInfo
      }
    });
    return this.httpService.callService(request, succCallback, failCallback);
  }

  /**
   * 从服务器返回的登录认证码生成加密。
   * @param passwd 登录密码
   * @param encSecretKey 加密密钥
   */
  restoreSecretKey(userCode: string, passwd: string, encSecretKey: string) {
    // 创建解密密钥
    const hashKey: string = CryptoJS.SHA256(
      CryptoJS.SHA256(userCode + passwd).toString()
    ).toString();
    const keyStr: string = hashKey.substr(0, 32);
    const ivStr: string = hashKey.substr(32, 32);

    // 解密会话密钥
    const secretKey = CryptoJS.AES.decrypt(
      encSecretKey,
      CryptoJS.enc.Hex.parse(keyStr),
      {
        iv: CryptoJS.enc.Hex.parse(ivStr),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    // 转换为字符串
    return secretKey.toString(CryptoJS.enc.Utf8);
  }

  /**
   * 创建会话密钥
   * @param userCode 用户号
   * @param loginPwd 登录密码
   * @param tokenKey  登录认证码
   */
  createSecretKey(
    userId: string,
    userCode: string,
    loginPwd: string,
    tokenKey: String
  ) {
    const encPasswd = CryptoJS.SHA256(userCode + loginPwd).toString();
    const secretKey = CryptoJS.SHA256(tokenKey + encPasswd + userId).toString();
    return secretKey;
  }
}
