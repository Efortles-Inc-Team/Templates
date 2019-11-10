import {Component, Inject, OnInit} from '@angular/core';
import {NgxTablePopupComponent} from '../../cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AdminapiService} from '../../../shared/services/adminapi.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html'
})
export class AddPlanComponent implements OnInit {
    public planform: FormGroup;
    public isNew: boolean;
    users: any;
    products: any;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<NgxTablePopupComponent>,
        private fb: FormBuilder,
        private adminApi: AdminapiService,
        private loader: AppLoaderService,
        private snack: MatSnackBar ) {
        this.isNew = this.data.isNew;

        if(this.isNew){
            this.loader.open('Fetching products...');
            this.adminApi.getProduct()
                .subscribe(data => {
                    if ( data.status ) {
                        this.loader.close();
                        this.products = data.data;
                    } else {
                        this.loader.close();
                        this.snack.open(data.message, 'error', { duration: 4000 });
                    }
                });
        }

    }



    ngOnInit() {
        this.buildItemForm(this.data.payload);
    }




    buildItemForm(document) {
        if (this.isNew) {
            document.trial_period_days = '0';
            document.interval_count = 1;
            this.planform = this.fb.group({
                name: [ document.name || '', Validators.required ],
                currency: [ document.currency || '', Validators.required ],
                amount: [ document.amount || '', Validators.required ],
                interval_count: [ document.interval_count || '', Validators.required ],
                interval: [ document.interval || '', Validators.required ],
                product: [ document.product || '', Validators.required ],
                trial_period_days: [ document.trial_period_days || '', Validators.required ],
                plan_id : [ document.plan_id || '']
            });
        }
        else{

            this.planform = this.fb.group({
                plan : [ document.id || ''],
                name: [ document.nickname || '', Validators.required ],
                trial_period_days: [ document.trial_period_days || '', Validators.required ]
            });

        }
    }



    submit() {

        let documentFormData = this.planform.value;

        this.loader.open();
        if ( this.isNew ) {
            this.adminApi.addPlan( documentFormData )
                .subscribe(data => {
                    if ( data.status ) {
                        this.loader.close();
                        this.snack.open('Plan added successfully', 'OK', { duration: 4000 });
                        this.dialogRef.close(this.planform.value);
                    } else {
                        this.loader.close();
                        this.snack.open(data.message, 'error', { duration: 4000 });
                    }
                });
        } else {
            this.adminApi.updatePlan( documentFormData )
                .subscribe(data => {
                    if (data.status) {
                        this.loader.close();
                        this.snack.open('Plan updated successfully', 'OK', { duration: 4000 });
                        this.dialogRef.close(this.planform.value);
                    } else {
                        this.loader.close();
                        this.snack.open(data.message, 'error', { duration: 4000 });
                    }
            });
        }

    }

    onContentChanged() { }
    onSelectionChanged() { }

}
