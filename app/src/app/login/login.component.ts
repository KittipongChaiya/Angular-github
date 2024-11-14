import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private http: HttpClient) {}  

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

  
      this.http.post('http://localhost:3001/logs', loginData)
        .subscribe({
          next: () => {
            
            this.router.navigate(['/profile'], {
              queryParams: { username: loginData.username, password: loginData.password }
            });
          },
          error: err => {
            console.error('ผิดพลาด:', err);
          }
        });
    }
  }
}
