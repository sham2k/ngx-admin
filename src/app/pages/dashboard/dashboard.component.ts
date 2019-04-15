import { Component } from "@angular/core";
import { HttpService, MessageService } from "../../services";
import * as CryptoJS from "crypto-js/index.js";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent {
  constructor(
    private httpService: HttpService,
    private messageService: MessageService
  ) {}

  test() {
    const mac = CryptoJS.HmacSHA256(
      '{"version":"1.00","access_key":"f57fa6ef9f8d42898fc4a90eb73cde6c","token_key":"98d91e80255ebce6387aa2530df60d34804e8a559f6b29c74ae07bb16a6a2d21","trns_type":"dfmp.602","trns_id":"da1c48aa3cba4dd6acdfb532309c338e","biz_datas":{"user_id":"f57fa6ef9f8d42898fc4a90eb73cde6c","old_passwd":"e69c6ed1c81f54686b001ee58fcec143fc284e780982693439957c5c01baaafb","new_passwd":"e69c6ed1c81f54686b001ee58fcec143fc284e780982693439957c5c01baaafb"},"timestamp":"2019-04-15T06:27:04.751","signature":""}',
      "c286e5b75ba37fb2e5c760c1c268bc7b3f81d0dca67f5e535243753076c3c993"
    ).toString();
    alert(CryptoJS.SHA256(mac));
  }
}
