import { SelectItem } from "primeng/api";
import { environment } from "environments/environment";
import {
   Group2TaiXeSearchInputDto,
   Group2TaiXeInsertInputDto,
} from "@shared/service-proxies/service-proxies";
import { Group2TaiXeServiceProxy } from "@shared/service-proxies/service-proxies";
import {
   Component,
   ViewChild,
   OnInit,
   AfterViewInit,
   Injector,
} from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import * as moment from "moment";
import { never } from "rxjs";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
   selector: "app-driver-add-group2",
   templateUrl: "./driver-add-group2.component.html",
   styleUrls: ["./driver-add-group2.component.less", "../../style.less"],
})
export class DriverAddGroup2Component extends AppComponentBase
   implements OnInit, AfterViewInit {
   @ViewChild("dataTable") dataTable: Table;
   @ViewChild("paginator") paginator: Paginator;
   constructor(
      injector: Injector,
      private Group2TaiXeServiceProxy: Group2TaiXeServiceProxy,
      private router: Router
   ) {
      super(injector);
      this.currentUserName = this.appSession.user.userName;

      this.licenses = [
         { label: "Chọn", value: "" },
         { label: "B1", value: "B1" },
         { label: "B2", value: "B2" },
         { label: "C1", value: "C1" },
         { label: "D", value: "D" },
         { label: "E", value: "E" },
         { label: "F", value: "F" },
      ];
   }

   driverInput: Group2TaiXeSearchInputDto = new Group2TaiXeSearchInputDto();
   driverInsert: Group2TaiXeInsertInputDto = new Group2TaiXeInsertInputDto();
   addFormControl = new FormControl();

   saveDialog: boolean;
   NgayBatDauLam: Date;
   licenses: SelectItem[];
   selectedLicense: SelectItem;

   currentUserName: string;
   ngAfterViewInit(): void {
      this.search();
   }

   checkIndexOfOption(array, option) {
      const index = array.findIndex((elm) => elm["value"] === option["value"]);
      if (index === -1) {
         array.push(option);
      }
   }

   resetForm() {
      this.addFormControl.reset();
   }

   search() {
      this.driverInput.taiXe_TrangThaiLamViec = "D";
      this.primengTableHelper.showLoadingIndicator();
      this.Group2TaiXeServiceProxy.tAIXE_Group2Search(
         this.driverInput
      ).subscribe((result) => {
         let no = 1;
         result.forEach((item) => {
            item["no"] = no++;
         });
         result.length < 1 && this.notify.error("Không tìm thấy dữ liệu");
         this.primengTableHelper.totalRecordsCount = result.length;
         this.primengTableHelper.records = result;
         this.primengTableHelper.hideLoadingIndicator();
      });
   }

   insert(): void {
      this.driverInsert.taiXe_NguoiTao = this.currentUserName;
      this.driverInsert.taiXe_TenNguoiDung = this.currentUserName;
      this.driverInsert.taiXe_NgayBatDauLam = moment(this.NgayBatDauLam);
      this.driverInsert.taiXe_UrlAnh = "null";
      this.driverInsert.taiXe_UrlThongTin = "null";

      this.Group2TaiXeServiceProxy.tAIXE_Group2Insert(
         this.driverInsert
      ).subscribe((response) => {
         if (response["Result"] == "1") {
            this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
         } else {
            this.notify.success(
               "Thêm tài xế thành công",
               "SUCCESS",
               environment.opt
            );
            this.driverInsert = new Group2TaiXeInsertInputDto();
            this.driverInput = new Group2TaiXeSearchInputDto();
            this.resetForm();
            this.search();
         }
      });
   }

   finalConfirm() {
      console.log(this.driverInsert);
      if (this.valueCheck() == true) {
         this.saveDialog = true;
      }
   }

   cancelConfirm() {
      this.router.navigate(["/app/admin/driver"]);
   }

   valueCheck(): boolean {
      if (
         this.driverInsert.taiXe_HoTen == null ||
         this.driverInsert.taiXe_HoTen === ""
      ) {
         this.notify.error(
            "Bạn chưa nhập tên tài xế",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.driverInsert.taiXe_MucLuong ||
         this.driverInsert.taiXe_MucLuong <= 0
      ) {
         this.notify.error(
            "Bạn nhập mức lương chưa đúng",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         this.driverInsert.taiXe_HangBangLai == null ||
         this.driverInsert.taiXe_HangBangLai === ""
      ) {
         this.notify.error(
            "Bạn phải chọn bằng lái của tài xế",
            "ERROR",
            environment.opt
         );
         return false;
      }
      // if (this.driverInsert.taiXe_UrlAnh == null || this.driverInsert.taiXe_UrlAnh === "") {
      //     this.notify.error("Phải có ảnh của tài xế", "ERROR", environment.opt);
      //     return false;
      // }
      // if (this.driverInsert.taiXe_UrlThongTin == null || this.driverInsert.taiXe_UrlThongTin === "") {
      //     this.notify.error("Phải có thông tin của tài xế", "ERROR", environment.opt);
      //     return false;
      // }
      return true;
   }

   ngOnInit() {}
}
