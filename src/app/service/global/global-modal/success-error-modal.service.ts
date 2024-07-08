import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../global/global-modal/modalComponent/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class SuccessErrorModalService {
  open(ModalComponent: any, arg1: { width: string; data: { type: string; message: string; }; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private dialog: MatDialog) {}

  // openSuccessModal(message: string): void {
  //   this.dialog.open(ModalComponent, {
  //     data: { type: 'success', message: message }
  //   });
  // }

  openSuccessModal(message: string, callback?: () => void): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { type: 'success', message: message }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok' && callback) {
        callback();
      }
    });
  }

  
  // openErrorModal(message: string): void {
  //   this.dialog.open(ModalComponent, {
  //     data: { type: 'error', message: message }
  //   });
  // }
 
 
  openErrorModal(message: string, onOk?: () => void, onCancel?: () => void): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { type: 'error', message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok' && onOk) {
        onOk();
      } else if (result === 'cancel' && onCancel) {
        onCancel();
      }
    });
  }
 
  
}
