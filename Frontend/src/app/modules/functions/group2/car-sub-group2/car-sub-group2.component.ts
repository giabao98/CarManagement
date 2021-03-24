import {
   Group2ThanhLySearchInputDto,
   Group2ThanhLyDto
} from "@shared/service-proxies/service-proxies";
import {
   Group2ThanhLyServiceProxy,
} from "@shared/service-proxies/service-proxies";
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
import { environment } from "environments/environment";
import * as moment from "moment";

@Component({
   selector: "app-car-sub-group2",
   templateUrl: "./car-sub-group2.component.html",
   styleUrls: ["./car-sub-group2.component.css", "../../style.less"],
})
export class CarSubGroup2Component extends AppComponentBase
   implements OnInit, AfterViewInit {
   @ViewChild("dataTable") dataTable: Table;
   @ViewChild("paginator") paginator: Paginator;
   constructor(
      injector: Injector,
      private _Group2ThanhLyServiceProxy: Group2ThanhLyServiceProxy
   ) {
      super(injector);
      this.currentUserName = this.appSession.user.userName;
   }

   currentUserName: string;
   ngOnInit() {}
   ngAfterViewInit(): void {
      this.search();
   }

   searchSelected;

   searchLists = [
      { label: "Mã", value: "ma" },
      { label: "Tên", value: "ten" },
      { label: "Biển số", value: "bienso" },
      { label: "Màu", value: "mau" },
      { label: "Hãng", value: "hang" },
      { label: "Năm sản xuất", value: "nsx" },
   ];

   searchListForm = [
      { label: "Mã", name: "ma", check: false, attr: "thanhLy_MaXe" },
      { label: "Tên", name: "ten", check: false, attr: "xe_Ten" },
      { label: "Biển số", name: "bienso", check: false, attr: "xe_BienSo" },
      { label: "Màu", name: "mau", check: false, attr: "xe_Mau" },
      { label: "Hãng", name: "hang", check: false, attr: "loaiXe_Hang" },
      {
         label: "Năm sản xuất",
         name: "nsx",
         check: false,
         attr: "loaiXe_NamSX",
      },
   ];

   changeFormSearch(event) {
      let list = event.value;
      for (let index = 0; index < this.searchListForm.length; index++) {
         const id = list.findIndex(
            (x) => x === this.searchListForm[index].name
         );

         if (id >= 0) {
            this.searchListForm[index].check = true;
         } else {
            this.searchListForm[index].check = false;
            var temp = this.searchListForm[index].attr;
            delete this.carSearchInput[temp];
         }
      }
      this.search();
   }

   carId: number;
   saveDialog: boolean;

   carSearchInput: Group2ThanhLySearchInputDto = new Group2ThanhLySearchInputDto();
   carSubInput: Group2ThanhLyDto = new Group2ThanhLyDto();

   search() {
      this.primengTableHelper.showLoadingIndicator();
      this._Group2ThanhLyServiceProxy
         .tHANHLY_Group2SearchXe(this.carSearchInput)
         .subscribe((result) => {
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
   onSearch() {
      this.primengTableHelper.showLoadingIndicator();
      this._Group2ThanhLyServiceProxy
         .tHANHLY_Group2SearchXe(this.carSearchInput)
         .subscribe((result) => {
            let no = 1;
            result.forEach((item) => {
               item["no"] = no++;
            });
            this.primengTableHelper.records = result;
            this.primengTableHelper.hideLoadingIndicator();
         });
   }

   carSub(): void {
      this._Group2ThanhLyServiceProxy
         .tHANHLY_Group2ThanhLy(this.carSubInput)
         .subscribe((response) => {
            if (response["Result"] == "1") {
               this.notify.error(
                  response["ErrorDesc"],
                  "ERROR",
                  environment.opt
               );
            } else {
               this.notify.success(
                  "Thanh lý thành công",
                  "SUCCESS",
                  environment.opt
               );
               this.carSubInput = new Group2ThanhLyDto();
               this.search();
            }
         });
      this.onSearch();
   }

   onClickRadio() {
      this.carSubInput.thanhLy_MaXe = this.carId;
   }

   saveConfirm() {
      this.carSubInput.thanhLy_NgayTao = moment();
      this.carSubInput.thanhLy_NguoiTao = this.currentUserName;
      if (this.valueCheck() == true) {
         this.saveDialog = true;
      }
   }

   cancelConfirm() {
      this.carSubInput = new Group2ThanhLyDto();
   }

   valueCheck(): boolean {
      if (
         this.carSubInput.thanhLy_NguoiMua == null ||
         this.carSubInput.thanhLy_NguoiMua === ""
      ) {
         this.notify.error(
            "Bạn chưa nhập tên người mua",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.carSubInput.thanhLy_SoTien ||
         this.carSubInput.thanhLy_SoTien <= 0
      ) {
         this.notify.error(
            "Bạn nhập số tiền chưa đúng",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (this.carSubInput.thanhLy_MaXe == null) {
         this.notify.error("Bạn chưa chọn xe", "ERROR", environment.opt);
         return false;
      }
      return true;
   }
}
