import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  constructor(public router: Router){}

  onLogOut(){
    localStorage.removeItem("login");
    localStorage.removeItem("roleId");
    this.router.navigate(["/login"]);
  }

}
