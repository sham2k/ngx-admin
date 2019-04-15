import { Injectable } from "@angular/core";
import { ConfigService } from "./config-service";
import * as UUID from "uuid";
import * as CryptoJS from "crypto-js/index.js";

/**
 * 安全会话报文服务
 */
@Injectable({
  providedIn: "root"
})
export class MessageService {
  constructor(private configService: ConfigService) {}

  /**
   * 创建报文
   */
  createRequest(reqData: any) {
    // 组织报文
    const request = {
      version: "1.00",
      access_key: this.configService.accessKey,
      token_key: this.configService.tokenKey,
      trns_type: "trns_type",
      trns_id: this.createUUID(),
      biz_datas: {},
      timestamp: this.getCurrentTime(),
      signature: ""
    };
    request.trns_type = reqData.trns_type;
    if (reqData.version != null) request.version = reqData.version;
    if (reqData.biz_datas != null) request.biz_datas = reqData.biz_datas;
    return this.signMessage(request);
  }

  /**
   * 签名请求报文
   * @param orgMsg 请求报文
   */
  signMessage(orgMsg: any) {
    const msgStr = JSON.stringify(orgMsg);
    if (this.configService.currentUser !== null) {
      orgMsg.signature = CryptoJS.HmacSHA256(
        msgStr,
        this.configService.secretKey
      ).toString();
      const retMsg = JSON.stringify(orgMsg);
      return retMsg;
    } else {
      return msgStr;
    }
  }

  /**
   * 验证报文签名，并返回原始报文。
   * @param signMsg 签名报文
   */
  verifyMessage(signMsg: any) {
    // 检查登录状态
    if (this.configService.currentUser == null) {
      // 没有登录不验签
      return signMsg;
    }

    // 分离报文和签名
    const orgSign = signMsg.signature;
    signMsg.signature = "";
    const orgMsg = JSON.stringify(signMsg);

    // 编制原始报文的签名
    const chkSign = CryptoJS.HmacSHA256(
      orgMsg,
      this.configService.secretKey
    ).toString();

    // 检查签名合法性
    if (chkSign === orgSign) {
      return signMsg;
    } else {
      return null;
    }
  }

  /**
   * 生成UUID
   */
  createUUID() {
    const uuid: string = UUID.v4();
    return uuid.replace(/\-/gi, "");
  }

  /**
   * 获取当前时间戳
   */
  getCurrentTime() {
    let currentTime = new Date().toISOString();
    if (currentTime.endsWith("Z")) {
      currentTime = currentTime.substring(0, currentTime.length - 1);
    }
    return currentTime;
  }

  /**
   * 创建分页查询请求地址
   */
  createPagedQueryParams(reqData: any) {
    const message = this.createRequest(reqData);
    return "message=" + encodeURIComponent(message);
  }
}
