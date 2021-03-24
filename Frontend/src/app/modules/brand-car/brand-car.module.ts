import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrandCarComponent } from "./brand-car.component";
import { BrandCarAddComponent } from "./brand-car-add/brand-car-add.component";
import { BrandCarEditComponent } from "./brand-car-edit/brand-car-edit.component";
import { FunctionsModule } from "../functions/functions.module";

@NgModule({
  imports: [CommonModule, FunctionsModule],
  declarations: [
    BrandCarComponent,
    BrandCarAddComponent,
    BrandCarEditComponent,
  ],
})
export class BrandCarModule {}
