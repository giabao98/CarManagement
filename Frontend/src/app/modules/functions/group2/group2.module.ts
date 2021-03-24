import { DriverSubGroup2Component } from './driver-sub-group2/driver-sub-group2.component';
import { DriverSearchGroup2Component } from './driver-search-group2/driver-search-group2.component';
import { DriverEditGroup2Component } from './driver-edit-group2/driver-edit-group2.component';
import { DriverAddGroup2Component } from './driver-add-group2/driver-add-group2.component';
import { Group2RoutingModule } from './group2.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarSubGroup2Component } from './car-sub-group2/car-sub-group2.component';
import { Group2ServiceProxyModule } from './group2.service-proxy.module';
import { DriverManagementGroup2Component } from './driver-management-group2/driver-management-group2.component';
import { MaterialManagementGroup2Component } from './material-management-group2/material-management-group2.component';
import { MaterialAddGroup2Component } from './material-add-group2/material-add-group2.component';
import { MaterialEditGroup2Component } from './material-edit-group2/material-edit-group2.component';
import { MaterialDeleteGroup2Component } from './material-delete-group2/material-delete-group2.component';
import { MaterialSubGroup2Component } from './material-sub-group2/material-sub-group2.component';
import { MaterialCarGroup2Component } from './material-car-group2/material-car-group2.component';
import { MaterialCarDeleteGroup2Component } from './material-car-delete-group2/material-car-delete-group2.component';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule, DropdownModule, InputTextModule, DialogModule, ButtonModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { UtilsModule } from '@shared/utils/utils.module';


@NgModule({
    imports: [
        Group2RoutingModule,
        CommonModule,
        FormsModule,
        TableModule,
        UtilsModule,
        AutoCompleteModule,
        RouterModule,
        Group2ServiceProxyModule,
        DropdownModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        ReactiveFormsModule,
        MultiSelectModule,
        CalendarModule
    ],
    declarations: [
        CarSubGroup2Component,
        DriverAddGroup2Component,
        DriverEditGroup2Component,
        DriverSearchGroup2Component,
        DriverSubGroup2Component,
        DriverManagementGroup2Component,
        MaterialManagementGroup2Component,
        MaterialAddGroup2Component,
        MaterialEditGroup2Component,
        MaterialDeleteGroup2Component,
        MaterialSubGroup2Component,
        MaterialCarGroup2Component,
        MaterialCarDeleteGroup2Component
    ],
    exports: [
        CarSubGroup2Component,
        DriverAddGroup2Component,
        DriverEditGroup2Component,
        DriverSearchGroup2Component,
        DriverSubGroup2Component,
        DriverManagementGroup2Component,
        MaterialManagementGroup2Component,
        MaterialAddGroup2Component,
        MaterialEditGroup2Component,
        MaterialDeleteGroup2Component,
        MaterialSubGroup2Component,
        MaterialCarGroup2Component,
        MaterialCarDeleteGroup2Component
    ],
})
export class Group2Module { }
