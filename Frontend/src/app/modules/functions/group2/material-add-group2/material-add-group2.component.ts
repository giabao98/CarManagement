import {
   Group2VatTuServiceProxy,
   Group2VatTuInsertInput,
} from "@shared/service-proxies/service-proxies";
import {
   Component,
   OnInit,
   Injector,
   AfterViewInit,
   ViewChild,
} from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { Table } from "primeng/table";
import { Paginator, SelectItem } from "primeng/primeng";
import {
   Group2TaiXeSearchInputDto,
   Group2TaiXeInsertInputDto,
} from "@shared/service-proxies/service-proxies";
import { Group2TaiXeServiceProxy } from "@shared/service-proxies/service-proxies";
import { FormControl } from "@angular/forms";
import { environment } from "environments/environment";
import * as moment from "moment";
import { Router } from "@angular/router";

@Component({
   selector: "app-material-add-group2",
   templateUrl: "./material-add-group2.component.html",
   styleUrls: ["./material-add-group2.component.css", "../../style.less"],
})
export class MaterialAddGroup2Component extends AppComponentBase
   implements OnInit, AfterViewInit {
   constructor(
      injector: Injector,
      private _Group2VatTuServiceProxy: Group2VatTuServiceProxy,
      private router: Router
   ) {
      super(injector);
      this.currentUserName = this.appSession.user.userName;
   }

   materialInsert: Group2VatTuInsertInput = new Group2VatTuInsertInput();
   TongTriGia : any;

   saveDialog: boolean;

   currentUserName: string;
   ngAfterViewInit(): void { }

   checkIndexOfOption(array, option) {
      const index = array.findIndex((elm) => elm["value"] === option["value"]);
      if (index === -1) {
         array.push(option);
      }
   }


   insert(): void {
      // this.driverInsert.taiXe_NguoiTao = this.currentUserName;
      // this.driverInsert.taiXe_TenNguoiDung = this.currentUserName;
      this._Group2VatTuServiceProxy.vATTU_Group2Insert(this.materialInsert)
      .subscribe((result) => {
         if (result["Result"] == "-1") {
            this.notify.error(result["ErrorDesc"], "ERROR", environment.opt);
         } else {
            this.notify.success(
               "Thêm vật tư thành công",
               "SUCCESS",
               environment.opt
            );
            this.materialInsert= new Group2VatTuInsertInput();
            this.TongTriGia = 0;
         }
      })
      // this.Group2TaiXeServiceProxy.tAIXE_Group2Insert(
      //    this.driverInsert
      // ).subscribe((response) => {
      //    if (response["Result"] == "1") {
      //       this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
      //    } else {
      //       this.notify.success(
      //          "Thêm tài xế thành công",
      //          "SUCCESS",
      //          environment.opt
      //       );
      //       delete this.driverInsert;
      //       this.resetForm();
      //    }
      // });
   }

   finalConfirm() {
      if (this.valueCheck() == true) {
         this.saveDialog = true;
      }
   }

   cancelConfirm() {
      this.router.navigate(['/app/admin/material']);
   }

   valueCheck(): boolean {
      if (
         this.materialInsert.vatTu_Ten == null ||
         this.materialInsert.vatTu_Ten === ""
      ) {
         this.notify.error(
            "Bạn chưa nhập tên vật tư",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.materialInsert.vatTu_SoLuong ||
         this.materialInsert.vatTu_SoLuong <= 0
      ) {
         this.notify.error(
            "Bạn số lượng chưa đúng",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.materialInsert.vatTu_DonGia ||
         this.materialInsert.vatTu_DonGia <= 0
      ) {
         this.notify.error(
            "Bạn nhập số lượng chưa đúng",
            "ERROR",
            environment.opt
         );
         return false;
      }
      return true;
   }

   changePrice() {
      this.TongTriGia = (this.materialInsert.vatTu_SoLuong)*(this.materialInsert.vatTu_DonGia);
   }

   ngOnInit() { }
}
