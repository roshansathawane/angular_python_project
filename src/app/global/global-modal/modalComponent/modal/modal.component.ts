import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  alertdata:any;

  ngOnInit(): void {
    
    // if(this.alertdata.type=="success"){
    //   alert("data: "+JSON.stringify(this.alertdata.type));
    //   const modaltype = document.getElementById('success_error_id') as HTMLDivElement;
    //   modaltype.classList.add('success-error-modal');
    //   modaltype.classList.remove('error');
    // }else{
    //   const modaltype = document.getElementById('success_error_id') as HTMLDivElement;
    //   modaltype.classList.remove('success');
    //   modaltype.classList.add('error');
    // }
   
  }
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   
  ) {
    this.alertdata=data;
   
  }

  onClose(): void {
    this.dialogRef.close();
   // this.router.navigate(['/DOP-dashboard-client'])

  }

  onOkClick(): void {
    this.dialogRef.close('ok');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  
}
