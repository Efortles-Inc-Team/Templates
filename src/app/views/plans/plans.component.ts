import { Component, OnInit } from '@angular/core';
import {egretAnimations} from '../../shared/animations/egret-animations';
import {Page} from '../../shared/models/page.model';
import {Subscription} from 'rxjs';
import {AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';
import {environment} from '../../../environments/environment';
import {AppLoaderService} from '../../shared/services/app-loader/app-loader.service';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AdminapiService} from '../../shared/services/adminapi.service';
import {AddPlanComponent} from './add-plan/add-plan.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  animations: egretAnimations
})
export class PlansComponent implements OnInit {

    public plans: any[];
    public getPlanDoc: Subscription;
    public page = new Page();
    public imageBaseURL: string;
    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private confirmService: AppConfirmService,
        private loader: AppLoaderService,
        private adminApi: AdminapiService
    ) {
        this.page.page = 0;
        this.page.size = environment.pageSize;
        this.page.search = '';
        this.imageBaseURL = environment.imageBaseURL;
    }

    ngOnInit() {
        this.getItems({ offset: 0 });
    }
    ngOnDestroy() {
        if (this.getPlanDoc) {
            this.getPlanDoc.unsubscribe()
        }
    }
    getItems(pageInfo) {
        this.page.page = pageInfo.offset;
        Promise.resolve(null).then(()=>this.loader.open('Loading..'));
        this.getPlanDoc = this.adminApi.getPlans()
            .subscribe(data => {
                if(data.status){
                    //this.page.page = data.current_page;
                    //this.page.totalElements = data.total;
                    this.plans = data.data;
                    this.loader.close();
                }
                else{
                    this.loader.close();
                }
         })
    }

    updateFilter(pageInfo){
        this.page.page = 0;
        this.page.search = pageInfo.target.value;
        this.getPlanDoc = this.adminApi.getPlans()
            .subscribe(data => {
                if(data.status){
                    this.page.page = data.current_page;
                    this.page.totalElements = data.total;
                    this.plans = data.data;
                }
            })
    }

    openPopUp(data: any = {}, isNew?) {
        let title = isNew ? 'Add new membership plan':'Edit membership plan';
        let dialogRef: MatDialogRef<any> = this.dialog.open(AddPlanComponent, {
            width: '720px',
            disableClose: true,
            data: { title: title, payload: data, isNew:isNew }
        });
        dialogRef.afterClosed()
            .subscribe(res => {
                this.reloadData();
        });
    }
    deleteItem(row) {
        this.confirmService.confirm({message: `Delete ${row.file_name.split('/')[1]}?`})
            .subscribe(res => {
                if (res) {
                    this.loader.open();
                    this.adminApi.deleteDocument(row)
                        .subscribe(data => {
                            this.loader.close();
                            this.reloadData();
                            this.snack.open('Plan deleted!', 'OK', { duration: 4000 });
                        });
                }
            });
    }

    reloadData() {
        this.getPlanDoc = this.adminApi.getPlans()
            .subscribe(data => {
                if (data.status) {
                    this.plans = data.data;
                }
            });
    }

}
