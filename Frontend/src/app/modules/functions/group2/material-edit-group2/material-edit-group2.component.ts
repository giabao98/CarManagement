import { Group2VatTuUpdateInput } from './../../../../../shared/service-proxies/service-proxies';
import {
   Group2VatTuServiceProxy,
   Group2VatTuSearchInput,
   Group2VatTuSearch,
} from "@shared/service-proxies/service-proxies";
import {
   Component,
   OnInit,
   Injector,
   AfterViewInit,
   ViewChild,
} from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { FormControl } from "@angular/forms";
import { environment } from "environments/environment";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
   selector: "app-material-edit-group2",
   templateUrl: "./material-edit-group2.component.html",
   styleUrls: ["./material-edit-group2.component.css", "../../style.less"],
})
export class MaterialEditGroup2Component extends AppComponentBase
   implements OnInit, AfterViewInit {
   constructor(
      injector: Injector,
      private _Group2VatTuServiceProxy: Group2VatTuServiceProxy,
      private route: ActivatedRoute,
      private router: Router,
   ) {
      super(injector);
      this.currentUserName = this.appSession.user.userName;
   }
   ngOnInit() {
      this.materialSearchInput.vatTu_Ma = Number(
         this.route.snapshot.paramMap.get("id")
      );
   }

   materialSearchInput : Group2VatTuSearchInput = new Group2VatTuSearchInput();
   materialSearch : Group2VatTuSearch = new Group2VatTuSearch();
   materialUpdate : Group2VatTuUpdateInput = new Group2VatTuUpdateInput();
   TongTriGia: any;

   search() {     
      this._Group2VatTuServiceProxy
         .vATTU_Group2Search(this.materialSearchInput)
         .subscribe((response) => {
            if (response["Result"] == "1") {
               this.notify.error(
                  response["ErrorDesc"],
                  "ERROR",
                  environment.opt
               );
            } else {
               this.materialSearch = response[0];
               this.TongTriGia = this.materialSearch.vatTu_DonGia * this.materialSearch.vatTu_SoLuong;
            }
         });
   }

   saveDialog: boolean;

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

   edit(): void {
      this._Group2VatTuServiceProxy
         .vATTU_Group2Update(this.materialUpdate)
         .subscribe((result) => {
            if (result["Result"] == "-1") {
               this.notify.error(result["ErrorDesc"], "ERROR", environment.opt);
            } else {
               this.notify.success(
                  "Chỉnh sửa vật tư thành công",
                  "SUCCESS",
                  environment.opt
               );
               this.TongTriGia = 0;
               this.router.navigate(['/app/admin/material']);
            }
         });
   }

   finalConfirm() {
      this.materialUpdate.ma = this.materialSearch.ma;
      this.materialUpdate.vatTu_Ten = this.materialSearch.vatTu_Ten;
      this.materialUpdate.vatTu_DonGia = this.materialSearch.vatTu_DonGia;
      this.materialUpdate.vatTu_SoLuong = this.materialSearch.vatTu_SoLuong;
      this.materialUpdate.vatTu_MoTa = this.materialSearch.vatTu_MoTa;
      this.materialUpdate.vatTu_NguoiTao = this.currentUserName;
      if (this.valueCheck() == true) {
         this.saveDialog = true;        
      }
   }

   cancelConfirm() {
      this.router.navigate(['/app/admin/material']);
   }

   valueCheck(): boolean {
      if (
         this.materialUpdate.vatTu_Ten == null ||
         this.materialUpdate.vatTu_Ten === ""
      ) {
         this.notify.error(
            "Bạn chưa nhập tên vật tư",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.materialUpdate.vatTu_SoLuong ||
         this.materialUpdate.vatTu_SoLuong <= 0
      ) {
         this.notify.error("Bạn số lượng chưa đúng", "ERROR", environment.opt);
         return false;
      }
      if (
         !this.materialUpdate.vatTu_DonGia ||
         this.materialUpdate.vatTu_DonGia <= 0
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
      this.TongTriGia =
         this.materialSearch.vatTu_SoLuong * this.materialSearch.vatTu_DonGia;
   }
   
}
