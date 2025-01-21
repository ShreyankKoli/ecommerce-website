import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(public router:Router){
    
  }

  onLogOut(){
    localStorage.removeItem("login");
    localStorage.removeItem("roleId");
    this.router.navigate(["/login"]);
  }

  onClick(){
    this.router.navigate(['/sellerform']);
  }

}
