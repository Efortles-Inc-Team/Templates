





import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import {AdminapiService} from '../../../shared/services/adminapi.service';
import {Page} from '../../../shared/models/page.model';
import {ChangeDetectorRef } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-crud-ngx-table',
  templateUrl: './crud-ngx-table.component.html',
  animations: egretAnimations
})
export class CrudNgxTableComponent implements OnInit, OnDestroy {
  public items: any[];
  public getItemSub: Subscription;
  public page = new Page();
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private adminApi: AdminapiService,
  ) {
      this.page.page = 0;
      this.page.size = environment.pageSize;
      this.page.search = '';
  }

  ngOnInit() {
      this.getItems({ offset: 0 });
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems(pageInfo) {
    this.page.page = pageInfo.offset;
    Promise.resolve(null).then(()=>this.loader.open('Loading..'));
    this.getItemSub = this.adminApi.getUsers(this.page)
      .subscribe(data => {
          if(data.status){
              this.page.page = data.current_page;
              this.page.totalElements = data.total;
              this.items = data.data;
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
      this.getItemSub = this.adminApi.getUsers(this.page)
          .subscribe(data => {
              if(data.status){
                  this.page.page = data.current_page;
                  this.page.totalElements = data.total;
                  this.items = data.data;
              }
          })
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new user' : 'Update user';
    let dialogRef: MatDialogRef<any> =  this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data, isNew:isNew }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
          this.reloadData();
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.display_name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.adminApi.removeUser(row.user_id)
            .subscribe(data => {
              if(data.status){
                  this.reloadData();
                  this.loader.close();
                  this.snack.open('User deleted!', 'OK', { duration: 4000 })
              }
              else{
                  this.loader.close();
                  this.snack.open(data.message, 'Error', { duration: 4000 });
              }

            })
        }
      })
  }

  reloadData(){
      this.getItemSub = this.adminApi.getUsers(this.page)
          .subscribe(data => {
              if(data.status){
                  this.page.page = data.current_page;
                  this.page.totalElements = data.total;
                  this.items = data.data;
              }
          })
  }
}
