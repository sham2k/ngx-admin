import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../dialogs/modal/modal.component";

/**
 * 模式窗口服务
 */
@Injectable({
  providedIn: "root"
})
export class DialogWindowService {
  constructor(private modalService: NgbModal) {}

  /**
   * 显示错误窗口
   */
  error(message: string, redirect?: string) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: "lg",
      container: "nb-layout"
    });
    activeModal.componentInstance.modalIcon = "ion-alert";
    activeModal.componentInstance.modalHeader = "错误..";
    activeModal.componentInstance.modalContent = message;
    if (redirect != null && redirect !== "") {
      activeModal.componentInstance.redirect = redirect;
    }
    return activeModal.result;
  }

  /**
   * 显示提示窗口
   */
  message(message: string, redirect?: string) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: "lg",
      container: "nb-layout"
    });
    activeModal.componentInstance.modalIcon = "ion-information";
    activeModal.componentInstance.modalHeader = "操作提示..";
    activeModal.componentInstance.modalContent = message;
    if (redirect != null && redirect !== "") {
      activeModal.componentInstance.redirect = redirect;
    }
    return activeModal.result;
  }

  /**
   * 显示询问窗口
   * @param message 提示信息
   * @param confirm 确定回调
   * @param cancel 取消回调
   */
  question(message: String, confirm?: any, cancel?: any) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: "lg",
      container: "nb-layout"
    });
    activeModal.componentInstance.modalIcon = "ion-information";
    activeModal.componentInstance.modalHeader = "操作询问..";
    activeModal.componentInstance.modalContent = message;
    activeModal.componentInstance.isShow = true;
    activeModal.result.then(
      value1 => {
        if (confirm != null) confirm();
      },
      value2 => {
        if (cancel != null) cancel();
      }
    );
  }
}
