import {
   Group2VatTuServiceProxy,
   Group2VatTuSearchInput,
   Group2VatTuSearch,
   Group2VatTuThanhLyInput,
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
import * as moment from "moment";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
   selector: "app-material-sub-group2",
   templateUrl: "./material-sub-group2.component.html",
   styleUrls: ["./material-sub-group2.component.css", "../../style.less"],
})
export class MaterialSubGroup2Component extends AppComponentBase
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
   TongTriGia: number;
   currentUserName: string;
   allOrPart: boolean = true;
   materialSearchInput: Group2VatTuSearchInput = new Group2VatTuSearchInput();
   materialSearch: Group2VatTuSearch = new Group2VatTuSearch();
   materialSub: Group2VatTuThanhLyInput = new Group2VatTuThanhLyInput();

   ngOnInit() {
      this.materialSearchInput.vatTu_Ma = Number(
         this.route.snapshot.paramMap.get("id")
      );
      this.search();     
   }
   ngAfterViewInit(): void {

   }

   finalConfirm() {
      if (this.allOrPart == true) {
         this.materialSub.thanhLyVatTu_SoLuong = this.materialSearch.vatTu_SoLuong
      }
      this.materialSub.thanhLyVatTu_NguoiTao = this.currentUserName;
      this.materialSub.thanhLyVatTu_MaVatTu = this.materialSearchInput.vatTu_Ma;
      if (this.valueCheck() == true) {
         this.saveDialog = true;
         console.log(this.materialSub);
      }
   }

   cancelConfirm() {
      this.router.navigate(['/app/admin/material']);
   }

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

   sub() {
      this._Group2VatTuServiceProxy.vATTU_Group2ThanhLy(this.materialSub)
      .subscribe((result) => {
         if (result["Result"] == "-1") {
            this.notify.error(
               result["ErrorDesc"],
               "ERROR",
               environment.opt
            );
         } else {
            this.notify.success(
               "Thanh lý thành công"
            );
            this.router.navigate(['/app/admin/material']);
         }
      });
   }

   confirmAll() {
      this.allOrPart = true;
   }
   confirmPart() {
      this.allOrPart = false;
   }

   saveDialog: boolean = false;

   valueCheck(): boolean {
      if (
         this.materialSub.thanhLyVatTu_LyDo == null ||
         this.materialSub.thanhLyVatTu_LyDo === ""
      ) {
         this.notify.error(
            "Bạn chưa nhập lý do",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.materialSub.thanhLyVatTu_SoLuong ||
         this.materialSub.thanhLyVatTu_SoLuong <= 0
      ) {
         this.notify.error(
            "Bạn số lượng chưa đúng",
            "ERROR",
            environment.opt
         );
         return false;
      }
      if (
         !this.materialSub.thanhLyVatTu_SoTienThanhLy ||
         this.materialSub.thanhLyVatTu_SoTienThanhLy <= 0
      ) {
         this.notify.error(
            "Bạn nhập số tiền chưa đúng",
            "ERROR",
            environment.opt
         );
         return false;
      }
      return true;
   }
}
