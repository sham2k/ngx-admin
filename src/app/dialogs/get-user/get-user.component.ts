import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss'],
})
export class GetUserComponent implements OnInit {
  userCode: string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close(this.userCode);
  }

  dismissModal() {
    this.activeModal.dismiss();
  }
}
