import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

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

  constructor(private router: Router, private databaseService: DatabaseService) {}

  onSubmit() {
    if (this.loginForm.valid) 
 {
    
      this.router.navigate(['/profile'],
         { queryParams: { username: this.loginForm.value.username, 
          password: this.loginForm.value.password } },
         
        );
        
        const logData = {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          ip: this.getIp(),
          timestamp: new Date()
        };
        this.databaseService.logLoginAttempt(logData);
      }
    }
  
    getIp() {

    }
  }



