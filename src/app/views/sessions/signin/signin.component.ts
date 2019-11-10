import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../shared/services/authentication.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  returnUrl: string;
  errorMessage: string;

  cookieuname : string;
  cookiepass : string;
  checked = true;



  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService,
  ) {
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }


  }

  ngOnInit() {

    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
     // this.submitButton.disabled = true;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.cookieuname = this.cookieService.get('username');
      this.cookiepass = this.cookieService.get('password');

      this.signinForm.controls['username'].setValue(this.cookieuname);
      this.signinForm.controls['password'].setValue(this.cookiepass);

      if(this.cookieuname != '' && this.cookiepass != ''){
          //  this.submitButton.disabled = false;
          this.checked = true;
      }
      else{
          this.checked = false;
      }

  }

  signin() {
    const signinData = this.signinForm.value;
    this.errorMessage = '';
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    this.authenticationService.login(signinData.username, signinData.password)
          .pipe(first())
          .subscribe(
              data => {
                  this.cookieConfig(signinData.username,signinData.password,signinData.rememberMe);
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.submitButton.disabled = false;
                  this.progressBar.mode = 'determinate';
                  this.errorMessage = 'Invalid username and/or password';
              });


  }

  cookieConfig(username:string,password:string,rememberme:boolean){
    if(rememberme){
        this.cookieService.set('username',username);
        this.cookieService.set('password',password);
    }
    else{
        this.cookieService.delete('username');
        this.cookieService.delete('password');
    }
  }



}
