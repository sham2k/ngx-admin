import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * 模态对话框模板
 */
@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header" style="background:#D3D3D3;">
      <span class="{{modalIcon}}"></span>
      <span class="col-10">{{ modalHeader }}</span>
        <button class="close" aria-label="Close" (click)="dismissModal()">
          <span>&times;</span>
        </button>
    </div>
    <div class="modal-body" style="width:40rem;height:8rem;">
      <h5>{{ modalContent }}</h5>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">确定</button>
      <button [hidden]="!isShow" class="btn btn-md btn-primary" (click)="dismissModal()">取消</button>
    </div>
  `,
})
export class ModalComponent {
  modalIcon = 'nb-info';
  modalHeader = '提示信息';
  modalContent = `提示内容`;
  redirect = '';
  isShow = false;

  constructor(private activeModal: NgbActiveModal, private router: Router) {
    this.isShow = false;
  }

  closeModal() {
    this.activeModal.close();
    if (this.redirect !== '') {
      this.router.navigateByUrl(this.redirect);
    }
  }

  dismissModal() {
    this.activeModal.dismiss();
  }
}
