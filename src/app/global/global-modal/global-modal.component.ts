import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';

@Component({
  selector: 'app-global-modal',
  templateUrl: './global-modal.component.html',
  styleUrls: ['./global-modal.component.scss'],
  //  providers: [NgbModalConfig, NgbModal]
})
export class GlobalModalComponent implements OnInit {

  // @Input() modelId: string | undefined;
  // @Input() successMsg: string | undefined;
  // @Input() errorMsg: string | undefined;
  // @Input() infoMsg: string | undefined;
  // @Input() callBackAction: any;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();
 // constructor(private activeModal: NgbActiveModal, private router: Router) { }
  constructor( private router: Router) { }

  ngOnInit() {
  }

  // public decline() {
  //   this.activeModal.close(false);
  // }

  // public accept() {
  //   this.activeModal.close(true);
  // }

  // public dismiss() {
  //   this.activeModal.dismiss();
  // }

  // callBackFunction(){
  //     if(this.callBackAction=='navigateToMiscellaneous'){
  //         this.navigateToMiscellaneous();
  //     }
  //     else if(this.callBackAction=='navigateToMiscellaneousCIN'){
  //         this.navigateToMiscellaneousCIN();
  //     }
  // }

  // navigateToMiscellaneous() {
  //   this.router.navigate(['/miscellaneous']);
  //   this.dismiss();
  // }

  // navigateToMiscellaneousCIN() {
  //   this.router.navigate(['/miscellaneousCIN']);
  //   this.dismiss();
  // }

}
