import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleCarsComponent } from './schedule-cars/schedule-cars.component';
import { ScheduleCarsAddComponent } from './schedule-cars-add/schedule-cars-add.component';
import { ScheduleCarsEditComponent } from './schedule-cars-edit/schedule-cars-edit.component';
import { ModulesRoutingModule } from '../modules-routing.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
import { FunctionsModule } from '../functions/functions.module';
import { ScheduleCarsSearchComponent } from './schedule-cars-search/schedule-cars-search.component';
import { ScheduleCarsSubComponent } from './schedule-cars-sub/schedule-cars-sub.component';

@NgModule({
    imports: [
        CommonModule,
        ModulesRoutingModule,
        FormsModule,
        TableModule,
        CalendarModule,
        CheckboxModule,
        FunctionsModule
    ],
    declarations: [
        ScheduleCarsComponent,
        ScheduleCarsAddComponent,
        ScheduleCarsEditComponent,
        ScheduleCarsSearchComponent,
        ScheduleCarsSubComponent,
    ]

})
export class ScheduleCarsModule { }
