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

import { AddDocumentComponent } from './add-document/add-document.component';

import { DocumentsComponent } from './documents.component';
import {DocumentsRoutes} from './document.routing';

@NgModule({
    imports: [
        CommonModule,
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
        RouterModule.forChild(DocumentsRoutes)
    ],
    declarations: [AddDocumentComponent, DocumentsComponent],
    providers: [],
    entryComponents: [AddDocumentComponent]
})
export class DocumentModule { }
