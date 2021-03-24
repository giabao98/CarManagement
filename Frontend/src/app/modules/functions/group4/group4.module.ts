import { ModalDenyRoadGroup4 } from './modal-group4/modal-deny-road-group4/modal-deny-road-group4.component';
import { RoadsEditGroup4Component } from './roads-edit-group4/roads-edit-group4.component';
import { RoadsViewGroup4Component } from './roads-view-group4/roads-view-group4.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ScheduleCarEditGroup4Component } from './schedule-car-edit-group4/schedule-car-edit-group4.component';
import { ScheduleCarAddGroup4Component } from './schedule-car-add-group4/schedule-car-add-group4.component';
import { ScheduleCarManagementGroup4Component } from './schedule-car-management-group4/schedule-car-management-group4.component';
import { ModelCarManagementGroup4Component } from './model-car-management-group4/model-car-management-group4.component';
import { Group4ServiceProxyModule } from "./group4.service-proxy.module";
import { TableModule } from "primeng/table";
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/primeng';
import { UtilsModule } from "@shared/utils/utils.module";
import { RoadsAddGroup4Component } from './roads-add-group4/roads-add-group4.component';
import { RoadsManagementGroup4Component } from './roads-management-group4/roads-management-group4.component';
import { SliderModule } from 'primeng/slider';
import { ScheduleCarViewGroup4Component } from './schedule-car-view-group4/schedule-car-view-group4.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        RouterModule,
        UtilsModule,
        AutoCompleteModule,
        DropdownModule,
        CalendarModule,
        SliderModule,
        Group4ServiceProxyModule,
        ModalModule.forRoot(),
    ],
    declarations: [
        ModelCarManagementGroup4Component,
        ModalDenyRoadGroup4,
        ScheduleCarManagementGroup4Component,
        ScheduleCarAddGroup4Component,
        ScheduleCarEditGroup4Component,
        ScheduleCarViewGroup4Component,
        RoadsViewGroup4Component,
        RoadsAddGroup4Component,
        RoadsEditGroup4Component,
        RoadsManagementGroup4Component
    ],
    exports: [
        ModelCarManagementGroup4Component,
        ModalDenyRoadGroup4,
        ScheduleCarManagementGroup4Component,
        ScheduleCarAddGroup4Component,
        ScheduleCarViewGroup4Component,
        ScheduleCarEditGroup4Component,
        RoadsViewGroup4Component,
        RoadsAddGroup4Component,
        RoadsEditGroup4Component,
        RoadsManagementGroup4Component,
    ],
    schemas: [
    ]
})
export class Group4Module { }
