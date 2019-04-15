import { Injectable } from "@angular/core";
import { HttpService } from "./http-service";
import { MessageService } from "./message-service";

/**
 * 系统参数服务
 */
@Injectable({
  providedIn: "root"
})
export class SysParmsService {
  constructor(
    private httpService: HttpService,
    private messageService: MessageService
  ) {}

  /**
   * 获取系统参数
   */
  getSysParms(succProc: Function) {
    const request = this.messageService.createRequest({
      trns_type: "dfmp.901",
      exts: {}
    });
    return this.httpService.callService(request, succProc);

    // 如希望对结果再加工，则使用此格式。
    // return this.httpProxy.callService(request, message => {
    //    // 对结果进行特殊处理。
    //    if (succProc != null) succProc(message);
    // });
  }
}
