import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import {AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../shared/services/app-loader/app-loader.service';
import {AddDocumentComponent} from './add-document/add-document.component';
import { egretAnimations } from "../../shared/animations/egret-animations";
import {AdminapiService} from '../../shared/services/adminapi.service';
import {Page} from '../../shared/models/page.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  animations: egretAnimations
})
export class DocumentsComponent implements OnInit {
    public documents: any[];
    public getDocSub: Subscription;
    public page = new Page();
    public imageBaseURL:string;
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
        if (this.getDocSub) {
            this.getDocSub.unsubscribe()
        }
    }
    getItems(pageInfo) {
        this.page.page = pageInfo.offset;
        Promise.resolve(null).then(()=>this.loader.open('Loading..'));
        this.getDocSub = this.adminApi.getDocumentList(this.page)
            .subscribe(data => {
                if(data.status){
                    this.page.page = data.current_page;
                    this.page.totalElements = data.total;
                    this.documents = data.data;
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
        this.getDocSub = this.adminApi.getDocumentList(this.page)
            .subscribe(data => {
                if(data.status){
                    this.page.page = data.current_page;
                    this.page.totalElements = data.total;
                    this.documents = data.data;
                }
            })
    }

    openPopUp(data: any = {}, isNew?) {
        let title = isNew ? 'Add new document':'Update Document';
        let dialogRef: MatDialogRef<any> = this.dialog.open(AddDocumentComponent, {
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
        this.confirmService.confirm({message: `Delete ${row.file_name.split('/')[1]}?`})
            .subscribe(res => {
                if (res) {
                    this.loader.open();
                    this.adminApi.deleteDocument(row)
                        .subscribe(data => {
                            this.loader.close();
                            this.reloadData();
                            this.snack.open('Document deleted!', 'OK', { duration: 4000 });
                        });
                }
            });
    }

    reloadData() {
        this.getDocSub = this.adminApi.getDocumentList(this.page)
            .subscribe(data => {
                if (data.status) {
                    this.page.page = data.current_page;
                    this.page.totalElements = data.total;
                    this.documents = data.data;
                }
            });
    }


}
