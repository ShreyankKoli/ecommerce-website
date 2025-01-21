import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../../service/service.service';
import { Model } from '../../../service/model.model';



@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model:Model[]=[];

  loginObj: any = {
    "userName": "",
    "password": ""
  };
  loggedObj: any={};
  cartItems: any[] =[]

  http=inject(HttpClient);

  constructor(private router:Router,private service: ServiceService){
    const localData = localStorage.getItem("login");
    // if(localData != null){
    //   // const parseObj = JSON.parse(localData);
    //   // this.loggedObj = parseObj;
    //   this.getCartData(this.loggedObj.userId);
    // }
  }
  onSignUp(){
    this.router.navigate(['/signup'])
  }

  
  onLogin(){
    const params = new HttpParams()   //HttpParams used to request certain resources from web server.
    .set('userName',this.loginObj.userName)
    .set('password',this.loginObj.password);

    let Token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKd3RTdWJqZWN0IiwianRpIjoiZTNmN2I0M2QtY2RjMS00MzhkLTkwZmQtM2Q0NWIzNjI1MDM3IiwidXNlck5hbWUiOiJzYXNhc2EiLCJGaXJzdE5hbWUiOiJzYXNhc2EiLCJleHAiOjE3MzY1MTc2ODMsImlzcyI6Ikp3dElzc3VlciIsImF1ZCI6Ikp3dEF1ZGllbmNlIn0.sxECx2qpDf7bojTGdWpZ3s_vWSXpzYYT0AhSjn3UNm0';
    let head_obj = new HttpHeaders().set('Authorization','bearer '+Token);
    this.http.get("https://localhost:7016/api/User/Login",{headers:head_obj , params})
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res) {  
            // alert("Login Success");
            const roldeId = res.user?.roleId || res.roleId;
            const userid = res.user?.userId || res.userId;
            console.log("RoleId",roldeId);
            if(roldeId){
              alert("Login Success");
            //localStorage.setItem("login",this.loginObj.userName);
            localStorage.setItem('login',JSON.stringify(res.user));
            localStorage.setItem("roleId",roldeId);
            localStorage.setItem('userId',userid)
             //this.router.navigate(['/dashboard']);
            
              switch(roldeId){
                case 100:
                  this.router.navigate(['/adminDasbhboard']);
                  break;
                case 101:
                    this.router.navigate(['/dashboard']);
                    break;
                case 102:
                  this.router.navigate(['/sellerDashboard']);
                  break;
                 default:
                  alert("Contact Customer Support"); 
              }
             }
          } else {
            alert("Login Failed: " + res.message);
          }
        },
        error: (err) => {
          console.error(err);
          alert("An error occurred: " + (err.error?.message || "Please try again later."));
        }
      });
  }


  // getCartData(id:number){
  //   this.service.getAddToCart(id)
  //   .subscribe((res:any)=>{
  //     this.cartItems = res.model;
  //   })
  // }
}




