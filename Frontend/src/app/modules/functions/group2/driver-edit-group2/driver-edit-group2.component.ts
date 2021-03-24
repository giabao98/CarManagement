import { Group2TaiXeSearchByIdDto } from "@shared/service-proxies/service-proxies";
import {
   Group2TaiXeSearchInputDto,
   Group2TaiXeUpdateInputDto,
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
import { Moment } from "moment";
import { environment } from "environments/environment";
import * as moment from "moment";

@Component({
   selector: "app-driver-edit-group2",
   templateUrl: "./driver-edit-group2.component.html",
   styleUrls: ["./driver-edit-group2.component.less", "../../style.less"],
})
export class DriverEditGroup2Component extends AppComponentBase
   implements OnInit, AfterViewInit {
   @ViewChild("dataTable") dataTable: Table;
   @ViewChild("paginator") paginator: Paginator;
   constructor(
      injector: Injector,
      private _Group2TaiXeServiceProxy: Group2TaiXeServiceProxy
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
      { label: "Hạng bằng lái", value: "hangbanglai" },
      { label: "Lương tối thiểu", value: "luongtoithieu" },
      { label: "Lương tối đa", value: "luongtoida" },
   ];

   searchListForm = [
      { label: "Mã", name: "ma", check: false, attr: "taiXe_Ma" },
      { label: "Tên", name: "ten", check: false, attr: "taiXe_HoTen" },
      {
         label: "Hạng bằng lái",
         name: "hangbanglai",
         check: false,
         attr: "taiXe_HangBangLai",
      },
      {
         label: "Lương tối thiểu",
         name: "luongtoithieu",
         check: false,
         attr: "taiXe_MucLuongNho",
      },
      {
         label: "Lương tối đa",
         name: "luongtoida",
         check: false,
         attr: "taiXe_MucLuongLon",
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
            delete this.driverInput[temp];
         }
      }
      this.search();
   }

   driverId: number;
   NgayDongBaoHiem: string;
   NgayHetHanBaoHiem: string;
   saveDialog: boolean;

   driverInput: Group2TaiXeSearchInputDto = new Group2TaiXeSearchInputDto();
   driverUpdateInfo: Group2TaiXeUpdateInputDto = new Group2TaiXeUpdateInputDto();

   driver: Group2TaiXeSearchByIdDto;

   onClickRadio() {
      this._Group2TaiXeServiceProxy
         .tAIXE_Group2SearchById(this.driverId)
         .subscribe((response) => {
            if (response["Result"] === "-1") {
               this.notify.error(response["ErrorDesc"]);
            } else {
               this.driver = response;
               this.driverUpdateInfo.taiXe_HoTen = this.driver.taiXe_HoTen;
               this.driverUpdateInfo.taiXe_MucLuong = this.driver.hopDong_MucLuong;
               if (this.driver.hopDong_NgayDongBaoHiem) {
                  this.NgayDongBaoHiem = moment(
                     this.driver.hopDong_NgayDongBaoHiem.toDate()
                  ).format("YYYY-MM-DD");
               } else this.NgayDongBaoHiem = "";
               if (this.driver.hopDong_NgayHetHan) {
                  this.NgayHetHanBaoHiem = moment(
                     this.driver.hopDong_NgayHetHan.toDate()
                  ).format("YYYY-MM-DD");
               } else this.NgayHetHanBaoHiem = "";
            }
         });
   }

   convertDate(str) {
      var date = new Date(str),
         mnth = ("0" + (date.getMonth() + 1)).slice(-2),
         day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
   }

   search() {
      this.driverInput.taiXe_TrangThaiLamViec = "D";
      this.primengTableHelper.showLoadingIndicator();
      this._Group2TaiXeServiceProxy
         .tAIXE_Group2Search(this.driverInput)
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
      this._Group2TaiXeServiceProxy
         .tAIXE_Group2Search(this.driverInput)
         .subscribe((result) => {
            let no = 1;
            result.forEach((item) => {
               item["no"] = no++;
            });
            this.primengTableHelper.records = result;
            this.primengTableHelper.hideLoadingIndicator();
         });
   }

   update(): void {
      this.driverUpdateInfo.ma = this.driverId;
      this.driverUpdateInfo.taiXe_UrlThongtin = "null";
      this._Group2TaiXeServiceProxy
         .tAIXE_Group2Update(this.driverUpdateInfo)
         .subscribe((response) => {
            if (response["Result"] == "1") {
               this.notify.error(
                  response["ErrorDesc"],
                  "ERROR",
                  environment.opt
               );
            } else {
               this.notify.success(
                  "Chỉnh sửa thông tin tài xế thành công",
                  "SUCCESS",
                  environment.opt
               );
               this.driverUpdateInfo = new Group2TaiXeUpdateInputDto();
               this.NgayDongBaoHiem = "";
               this.NgayHetHanBaoHiem = "";
               this.search();
            }
         });
      this.onSearch();
   }
   saveConfirm() {
      console.log(this.driverUpdateInfo);
      if (this.valueCheck() == true) {
         this.saveDialog = true;
      }
   }

   cancelConfirm() {
      this.driverUpdateInfo = new Group2TaiXeUpdateInputDto();
   }

   valueCheck(): boolean {
      this.driverUpdateInfo.taiXe_NgayDongBaoHiem = moment(
         this.NgayDongBaoHiem
      );
      this.driverUpdateInfo.taiXe_NgayHetHanBaoHiem = moment(
         this.NgayHetHanBaoHiem
      );

      if (
         this.driverUpdateInfo.taiXe_HoTen == null ||
         this.driverUpdateInfo.taiXe_HoTen === ""
      ) {
         this.notify.error(
            "Bạn chưa nhập tên tài xế",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.driverUpdateInfo.taiXe_MucLuong ||
         this.driverUpdateInfo.taiXe_MucLuong <= 0
      ) {
         this.notify.error(
            "Bạn nhập mức lương chưa đúng",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (this.driverUpdateInfo.taiXe_NgayDongBaoHiem == null) {
         this.notify.error(
            "Bạn phải chọn ngày đóng bảo hiểm của tài xế",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (this.driverUpdateInfo.taiXe_NgayHetHanBaoHiem == null) {
         this.notify.error(
            "Bạn phải chọn ngày hết hạn bảo hiểm của tài xế",
            "ERROR",
            environment.opt
         );
         return false;
      }
      // if (
      //    this.driverUpdateInfo.taiXe_UrlThongtin == null ||
      //    this.driverUpdateInfo.taiXe_UrlThongtin === ""
      // ) {
      //    this.notify.error(
      //       "Phải có thông tin của tài xế",
      //       "ERROR",
      //       environment.opt
      //    );
      //    return false;
      // }
      return true;
   }
}
