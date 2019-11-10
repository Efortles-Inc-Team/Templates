import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {AdminapiService} from '../../../shared/services/adminapi.service';
import {NgxTablePopupComponent} from '../../cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';



@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html'
})
export class AddDocumentComponent implements OnInit {
    public documentForm: FormGroup;
    public isNew: boolean;
    users: any;
    fileToUpload: File = null;
    selectedUser:string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NgxTablePopupComponent>,
        private fb: FormBuilder,
        private adminApi: AdminapiService,
        private loader: AppLoaderService,
        private snack: MatSnackBar
    ) {
        this.isNew = this.data.isNew;
        this.loader.open('Fetching user...')
        this.adminApi.getUsersList().subscribe(res => {
            if (res.status) {
                this.users = res.data;
                this.loader.close();
            } else {
                this.users = [];
                this.loader.close();
            }
        });
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    ngOnInit() {
        this.buildItemForm(this.data.payload);
    }

    buildItemForm(document) {
        if(this.isNew){
            this.documentForm = this.fb.group({
                title: [ document.title || '', Validators.required ],
                file: [ document.file || '', Validators.required ],
                user: [ document.user || '', Validators.required ]
            });
        }
        else{
            this.documentForm = this.fb.group({
                title: [ document.title || '', Validators.required ],
                doc_id: [ document.id || '' ]
            });
            this.documentForm['title'] = document.title;
            this.documentForm['id'] = document.id;
        }
    }

    submit() {

        let documentFormData = this.documentForm.value;

        this.loader.open();
        if ( this.isNew ) {
            this.adminApi.addDocument(documentFormData, this.fileToUpload)
                .subscribe(data => {
                    if ( data.status ) {
                        this.loader.close();
                        this.snack.open('Document uploaded successfully', 'OK', { duration: 4000 });
                        this.dialogRef.close(this.documentForm.value);
                    } else {
                        this.loader.close();
                        this.snack.open(data.message, 'error', { duration: 4000 });
                    }
                });
        } else {
            this.adminApi.updateDocument( documentFormData )
                .subscribe(data => {
                    if (data.status) {
                        this.loader.close();
                        this.snack.open('Document updated successfully', 'OK', { duration: 4000 });
                        this.dialogRef.close(this.documentForm.value);
                    } else {
                        this.loader.close();
                        this.snack.open(data.message, 'error', { duration: 4000 });
                    }
                });
        }

    }

}
