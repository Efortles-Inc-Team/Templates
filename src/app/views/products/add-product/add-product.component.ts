import {Component, Inject, OnInit} from '@angular/core';
import {NgxTablePopupComponent} from '../../cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminapiService} from '../../../shared/services/adminapi.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
    public productForm: FormGroup;
    public isNew: boolean;

   constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NgxTablePopupComponent>,
              private fb: FormBuilder,
              private adminApi: AdminapiService,
              private loader: AppLoaderService,
              private snack: MatSnackBar) {
      this.isNew = this.data.isNew;
   }

    buildItemForm(document) {
        if (this.isNew) {
            this.productForm = this.fb.group({
                name: [ document.name || '', Validators.required ],
                description: [ document.description || '', Validators.required ],
                services: [ document.services || '', Validators.required ]
            });
        }
        else{
            this.productForm = this.fb.group({
                name: [ document.name || '', Validators.required ],
                description: [ document.metadata.description || '', Validators.required ],
                services: [ document.metadata.services || '', Validators.required ],
                product_id: [ document.id || '' ]
            });


        }
    }

    ngOnInit() {
        this.buildItemForm(this.data.payload);
    }

    submit() {

        let documentFormData = this.productForm.value;

        this.loader.open();
        if ( this.isNew ) {
            this.adminApi.addProduct( documentFormData )
                .subscribe(data => {
                    if ( data.status ) {
                        this.loader.close();
                        this.snack.open('Product added successfully', 'OK', { duration: 4000 });
                        this.dialogRef.close(this.productForm.value);
                    } else {
                        this.loader.close();
                        this.snack.open(data.message, 'error', { duration: 4000 });
                    }
                });
        } else {
            this.adminApi.updateProduct( documentFormData )
                .subscribe(data => {
                    if (data.status) {
                        this.loader.close();
                        this.snack.open('Product updated successfully', 'OK', { duration: 4000 });
                        this.dialogRef.close(this.productForm.value);
                    } else {
                        this.loader.close();
                        this.snack.open(data.message, 'error', { duration: 4000 });
                    }
            });
        }

    }


}
