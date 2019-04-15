import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-get-directory',
  templateUrl: './get-directory.component.html',
  styleUrls: ['./get-directory.component.scss'],
})
export class GetDirectoryComponent {
  pathName: string;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close(this.pathName);
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

}
