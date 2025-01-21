import { Component } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Model } from '../../../service/model.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  loginForm: FormGroup;

  constructor(private formbuilder: FormBuilder, private http: HttpClient,public service:ServiceService,
    private router:Router
  ) {
    this.loginForm = this.formbuilder.group({
      userId: 0,
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      mobile: [''],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        ...this.loginForm.value,
        roleId: 101, 
      };

      this.http.post('https://localhost:7016/api/User/User', loginData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert(err.error);
        },
      });
    }
  }

  click(){
    alert("Signed Up Successfylly");
    //this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }
}
