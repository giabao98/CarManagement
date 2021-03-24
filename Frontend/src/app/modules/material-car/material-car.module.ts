import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialCarComponent } from "./material-car.component";
import { MaterialAddComponent } from "./material-add/material-add.component";
import { MaterialManagementComponent } from "./material-management/material-management.component";
import { MaterialEditComponent } from "./material-edit/material-edit.component";
import { MaterialDelComponent } from "./material-del/material-del.component";
import { MaterialSubComponent } from "./material-sub/material-sub.component";
import { FunctionsModule } from "../functions/functions.module";

@NgModule({
  imports: [CommonModule, FunctionsModule],
  declarations: [
    MaterialCarComponent,
    MaterialAddComponent,
    MaterialManagementComponent,
    MaterialEditComponent,
    MaterialDelComponent,
    MaterialSubComponent,
  ],
})
export class MaterialCarModule {}
