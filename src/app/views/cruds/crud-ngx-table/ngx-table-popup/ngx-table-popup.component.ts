import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AdminapiService} from '../../../../shared/services/adminapi.service';
import {AppLoaderService} from '../../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html'
})
export class NgxTablePopupComponent implements OnInit {
  public userForm: FormGroup;
  public isNew: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: FormBuilder,
    private adminApi: AdminapiService,
    private loader: AppLoaderService,
    private snack: MatSnackBar
  ) {
    this.isNew = this.data.isNew;
  }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    if(this.isNew){
        this.userForm = this.fb.group({
            user_name: [item.user_name || '', Validators.required],
            user_email: [item.user_email || '', [Validators.required,Validators.email]],
            display_name: [item.display_name || '',Validators.required],
            password: [item.password || '',Validators.required],
            confirm_password: [item.confirm_password || '',Validators.required],
            user_id: [item.user_id || '']
        })
    }
    else{
        this.userForm = this.fb.group({
            user_name: [item.user_name || '', Validators.required],
            user_email: [item.user_email || '', [Validators.required,Validators.email]],
            display_name: [item.display_name || '',Validators.required],
            user_id: [item.user_id || '']
        })
        this.userForm['user_name'] = item.user_name;
        this.userForm['user_email'] = item.user_email;
        this.userForm['display_name'] = item.display_name;
        this.userForm['user_id'] = this.data._id;
    }
  }

  submit() {
      this.loader.open();
      if(this.isNew){
          this.adminApi.addUser(this.userForm.value)
              .subscribe(data => {
                  if(data.status){
                      this.loader.close();
                      this.snack.open('User Added', 'OK', { duration: 4000 });
                      this.dialogRef.close(this.userForm.value);
                  }
                  else{
                      this.loader.close();
                      this.snack.open(data.message, 'error', { duration: 4000 });
                  }
              })
      }
      else{
          this.adminApi.updateUser( this.userForm.value)
              .subscribe(data => {
                  if(data.status){
                      this.loader.close();
                      this.snack.open('User Updated', 'OK', { duration: 4000 });
                      this.dialogRef.close(this.userForm.value);
                  }
                  else{
                      this.loader.close();
                      this.snack.open(data.message, 'error', { duration: 4000 });
                  }
              })
      }
  }
}
