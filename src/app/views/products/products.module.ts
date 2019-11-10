import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';

import { ProductsRoutes } from './products.routing';
import {QuillModule} from 'ngx-quill';
import {AddProductComponent} from './add-product/add-product.component';
import {ProductsComponent} from './products.component';

@NgModule({
    imports: [
        CommonModule,
        QuillModule,
        MatAutocompleteModule,
        MatSelectModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxDatatableModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatChipsModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        SharedModule,
        RouterModule.forChild(ProductsRoutes)
    ],
    declarations: [ ProductsComponent, AddProductComponent],
    providers: [],
    entryComponents: [AddProductComponent]
})

export class ProductsModule { }
