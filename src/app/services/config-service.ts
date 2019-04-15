import { Injectable } from "@angular/core";

/**
 * 配置服务
 */
@Injectable({
  providedIn: "root"
})
export class ConfigService {
  public serverUrl: string; // 服务器地址
  public pageQueryUrl: string; // 分页查询服务地址
  public uploadUrl: string; // 文件上传地址
  public downloadUrl: string; // 文件下载地址
  public userLogin: boolean; // 客户已登录？
  public currentUser: any; // 当前用户数据
  public accessKey: string; // 当前会话Key
  public tokenKey: string; // 当前登录认证码
  public secretKey: string; // 会话加密密钥
  public nonSignMessages: string; // 非签名报文清单
  private cache: { [key: string]: any } = {}; // 缓存数据

  constructor() {
    this.serverUrl = "/api";
    this.pageQueryUrl = "/api/page";
    this.downloadUrl = "/api/download";
    this.uploadUrl = "/api/upload";
    this.nonSignMessages = "cams.900,cams.901";
    this.accessKey = "";
    this.tokenKey = "";
    this.secretKey = "";
    this.userLogin = false;
  }

  /**
   * 存储对象
   * @param key 对象的Key
   * @param value 对象的值
   */
  put(key: string, value: any) {
    this.cache[key] = value;
  }

  /**
   * 合并一个对象
   * @param value 对象值
   */
  putAll(value: any) {
    for (const k in value) {
      this.cache[k] = value[k];
    }
  }

  /**
   * 获取存储的对象
   * @param key 对象的KEY
   */
  get(key: string) {
    return this.cache[key];
  }
}
