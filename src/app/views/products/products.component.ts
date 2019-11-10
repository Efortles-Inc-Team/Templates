import { Component, OnInit } from '@angular/core';
import {egretAnimations} from '../../shared/animations/egret-animations';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {environment} from '../../../environments/environment';
import {AppLoaderService} from '../../shared/services/app-loader/app-loader.service';
import {Subscription} from 'rxjs';
import {Page} from '../../shared/models/page.model';
import {AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';
import {AddPlanComponent} from '../plans/add-plan/add-plan.component';
import {AdminapiService} from '../../shared/services/adminapi.service';
import {AddProductComponent} from './add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  animations: egretAnimations
})
export class ProductsComponent implements OnInit {

    public products: any[];
    public getProductSub: Subscription;
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
        if (this.getProductSub) {
            this.getProductSub.unsubscribe()
        }
    }
    getItems(pageInfo) {
        this.page.page = pageInfo.offset;
        Promise.resolve(null).then(()=>this.loader.open('Loading..'));
        this.getProductSub = this.adminApi.getProduct()
            .subscribe(data => {
                if(data.status){
                    //this.page.page = data.current_page;
                    //this.page.totalElements = data.total;
                    this.products = data.data;
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
        this.getProductSub = this.adminApi.getProduct()
            .subscribe(data => {
                if(data.status){
                    //this.page.page = data.current_page;
                    //this.page.totalElements = data.total;
                    this.products = data.data;
                }
            })
    }

    openPopUp(data: any = {}, isNew?) {
        let title = isNew ? 'Add new product':'Edit product';
        let dialogRef: MatDialogRef<any> = this.dialog.open(AddProductComponent, {
            width: '720px',
            disableClose: true,
            data: { title: title, payload: data, isNew:isNew }
        })
        dialogRef.afterClosed()
            .subscribe(res => {
                this.reloadData();
            });
    }

    deleteItem(row) {
        this.confirmService.confirm({message: `Delete ${row.name}?`})
            .subscribe(res => {
                if (res) {
                    this.loader.open();
                    this.adminApi.deleteProduct(row.id)
                        .subscribe(data => {
                            this.loader.close();
                            this.reloadData();
                            this.snack.open('Product deleted!', 'OK', { duration: 4000 });
                        });
                }
            });
    }

    reloadData() {
        this.getProductSub = this.adminApi.getProduct()
            .subscribe(data => {
                if (data.status) {
                   // this.page.page = data.current_page;
                   // this.page.totalElements = data.total;
                    this.products = data.data;
                }
            });
    }


}
