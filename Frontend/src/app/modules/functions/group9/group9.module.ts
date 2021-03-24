import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModelCarAddGroup9Component } from "./model-car-add-group9/model-car-add-group9.component";
import { Group9ServiceProxyModule } from "./group9.service-proxy.module";
import { MaintenanceCarGroup9Component } from "./maintenance-car-group9/maintenance-car-group9.component";
import { MaintenanceCarAddGroup9Component } from "./maintenance-car-add-group9/maintenance-car-add-group9.component";
import { MaintenanceCarEditGroup9Component } from "./maintenance-car-edit-group9/maintenance-car-edit-group9.component";
import { BrandCarManagementGroup9Component } from "./brand-car-management-group9/brand-car-management-group9.component";
import { BrandCarAddGroup9Component } from "./brand-car-add-group9/brand-car-add-group9.component";
import { BrandCarEditGroup9Component } from "./brand-car-edit-group9/brand-car-edit-group9.component";

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, Group9ServiceProxyModule],
  declarations: [
    ModelCarAddGroup9Component,
    MaintenanceCarGroup9Component,
    MaintenanceCarAddGroup9Component,
    MaintenanceCarEditGroup9Component,
    BrandCarManagementGroup9Component,
    BrandCarAddGroup9Component,
    BrandCarEditGroup9Component,
  ],
  exports: [
    ModelCarAddGroup9Component,
    MaintenanceCarGroup9Component,
    MaintenanceCarAddGroup9Component,
    MaintenanceCarEditGroup9Component,
    BrandCarManagementGroup9Component,
    BrandCarAddGroup9Component,
    BrandCarEditGroup9Component,
  ],
})
export class Group9Module {}
