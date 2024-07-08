import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarService } from '../../service/global/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
redirectTo(arg0: string) {
throw new Error('Method not implemented.');
}

  client :string='';
  lhs :string = '';
   value : string='';
  //  clienttab_ShowHide:any=window.sessionStorage.getItem("clienttab");
  
   clienttab_ShowHide:boolean=true;
  //  clienttab_ShowHide_auth:boolean=!this.clienttab_ShowHide;
sideBarBtnValue:boolean=false;
  constructor(private sidebarService: SidebarService) {
   }
   @Output() setSideBarEvent = new EventEmitter<string>();

  //  showAlert() {
  //    this.alertEvent.emit('Alert triggered from sidebar!');
  //  }
  
  ngOnInit() {
 const val = window.sessionStorage.getItem('appDeploySide');

 if(val === 'CLIENT'){


this.lhs = 'F'
 }else{

  this.lhs = 'T'
 }
 


 this.sidebarService.sidebarState$.subscribe((state) => {
  // alert("state : "+state);
  this.clienttab_ShowHide = state;
  // if(state=false)
  // Perform actions based on sidebar state change
});
  }


  sideBarBtn(){
if(this.sideBarBtnValue){
  // localStorage.setItem("sidebarbtn","true");
  this.setSideBarEvent.emit('true');
  this.sideBarBtnValue=false;
}else{
  // localStorage.setItem("sidebarbtn","false");
  this.setSideBarEvent.emit('false');
  this.sideBarBtnValue=true;
}
//this.setSideBarEvent.emit('SetSideBar triggered from sidebar!');
  }
}
