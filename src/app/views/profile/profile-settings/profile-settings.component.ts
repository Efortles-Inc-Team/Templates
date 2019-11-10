import {Component, OnInit, ViewChild} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Admin} from '../../../shared/models/admin.model';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first, map} from 'rxjs/operators';
import {MatButton, MatSnackBar} from '@angular/material';
import {Error} from 'tslint/lib/error';
import {AdminapiService} from '../../../shared/services/adminapi.service';
import {Router} from '@angular/router';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  currentUser:Admin;
  currentUserSubscription: Subscription;
  profileUpdateForm: FormGroup;
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;

  title = 'Please Wait Updating';


  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private AdminApi: AdminapiService,
      private router: Router,
      private loader: AppLoaderService,
      public snackBar: MatSnackBar
      ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }


  ngOnInit() {


      this.profileUpdateForm = new FormGroup({
          user_name: new FormControl('', Validators.required),
          user_email: new FormControl('', Validators.required),
          display_name: new FormControl('', Validators.required)
      });

      this.profileUpdateForm.controls['user_name'].setValue(this.currentUser.user_name);
      this.profileUpdateForm.controls['user_email'].setValue(this.currentUser.user_email);
      this.profileUpdateForm.controls['display_name'].setValue(this.currentUser.display_name);

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  updateProfile(){
      let updateFormData = this.profileUpdateForm.value;
      this.submitButton.disabled = true;
      this.loader.open(this.title);
      this.AdminApi.updateProfile(updateFormData).pipe(first())
          .subscribe(response => {
              if(response.status){
                  let currentUserObj = JSON.parse(localStorage.getItem('currentUser'));
                  currentUserObj.user_name = updateFormData.user_name;
                  currentUserObj.display_name = updateFormData.display_name;
                  currentUserObj.user_email = updateFormData.user_email;
                  localStorage.setItem('currentUser', JSON.stringify(currentUserObj));
                  this.authenticationService.currentUserValue.display_name = updateFormData.display_name;
                  this.loader.close();
                  this.submitButton.disabled = false;
              }
              else{
                  this.loader.close();
                  this.submitButton.disabled = false;
                  this.snackBar.open(response.message, 'close', { duration: 4000 });
              }
              }, error => {
                  this.submitButton.disabled = false;

          });
  }


}
