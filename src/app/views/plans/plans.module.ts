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

import { PlansComponent } from './plans.component';
import { AddPlanComponent } from './add-plan/add-plan.component';

import { PlansRoutes } from './plans.routing';
import {QuillModule} from 'ngx-quill';

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
        RouterModule.forChild(PlansRoutes)
    ],
    declarations: [ PlansComponent, AddPlanComponent],
    providers: [],
    entryComponents: [AddPlanComponent]
})

export class PlansModule { }
