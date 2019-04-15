import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { DialogWindowService } from "./dialog-window";
import { ConfigService } from "./config-service";
import { MessageService } from "./message-service";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private dialog: DialogWindowService,
    private configService: ConfigService,
    private messageService: MessageService
  ) {}

  /**
   * GET操作
   * @param endpoint 访问地址
   * @param params 传递的参数数组
   * @param reqOpts 选项
   */
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    return this.http
      .get(this.configService.serverUrl + endpoint, reqOpts)
      .timeout(5000);
  }

  /**
   * POST数据给服务器。
   * @param endpoint 访问地址
   * @param body 传输的数据（JSON）
   * @param reqOpts 选项
   */
  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http
      .post(this.configService.serverUrl + endpoint, body, reqOpts)
      .timeout(5000);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(
      this.configService.serverUrl + endpoint,
      body,
      reqOpts
    );
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.configService.serverUrl + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(
      this.configService.serverUrl + endpoint,
      body,
      reqOpts
    );
  }

  /**
   * 提交报文请求给服务器。
   * @param request
   * @param succProc
   * @param failProc
   * @param errProc
   */
  callService(
    request: string,
    succProc?: Function,
    failProc?: Function,
    errProc?: Function
  ) {
    // 设置请求参数
    const reqOpts = {
      headers: "Content-Type: application/json"
    };

    // 提交请求
    const seq = this.post("", request, reqOpts);

    // 设置应答处理
    seq.subscribe(
      (response: any) => {
        // 自动验证报文签名
        const rtnMsg = this.messageService.verifyMessage(response);
        if (rtnMsg === null) {
          // 验证失败
          this.dialog.error(
            "很抱歉，验证应答报文签名失败，请稍后重新提交此请求！"
          );
        } else {
          // 验证通过
          if (rtnMsg.rtn_code === "ISCC") {
            if (succProc === null) {
              this.dialog.message(rtnMsg.rtn_mesg);
            } else {
              succProc(rtnMsg);
            }
          } else {
            if (failProc === null) {
              this.dialog.error(rtnMsg.rtn_mesg);
            } else {
              failProc(rtnMsg);
            }
          }
        }
      },
      err => {
        if (errProc == null) {
          this.dialog.error("很抱歉，好像网络不通啊，请检查下网络吧！");
        } else {
          errProc(err);
        }
      }
    );
    return seq;
  }

  /**
   * 下载文件
   * @param request 请求报文
   */
  download(request: string) {
    window.location.href =
      this.configService.downloadUrl +
      "?message=" +
      encodeURIComponent(request);
  }
}
