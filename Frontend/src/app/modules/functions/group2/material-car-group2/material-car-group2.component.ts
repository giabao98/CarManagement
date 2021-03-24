import { PrimengTableHelper } from "@shared/helpers/PrimengTableHelper";
import {
   Group4LoaiXeServiceProxy,
   Group4LoaiXeDto,
   Group2VatTuTheoXeSearchInput,
   Group2VatTuTheoXeInsert,
   Group2VatTuSearch,
   Group2VatTuSearchInput,
   Group2VatTuTheoXeDelete,
} from "@shared/service-proxies/service-proxies";
import { Group2VatTuServiceProxy } from "@shared/service-proxies/service-proxies";
import {
   Component,
   OnInit,
   Injector,
   AfterViewInit,
   ViewChild,
} from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";

@Component({
  selector: 'app-material-car-group2',
  templateUrl: './material-car-group2.component.html',
  styleUrls: ['./material-car-group2.component.css', "../../style.less"]
})
export class MaterialCarGroup2Component extends AppComponentBase implements OnInit, AfterViewInit {

  @ViewChild("dataTable1") dataTable1: Table;
   @ViewChild("dataTable2") dataTable2: Table;
   @ViewChild("paginator") paginator: Paginator;
   constructor(
      injector: Injector,
      private _Group4LoaiXeServiceProxy: Group4LoaiXeServiceProxy,
      private _Group2VatTuServiceProxy: Group2VatTuServiceProxy
   ) {
      super(injector);
   }

   ngOnInit() {
      this.carWithoutMaterialSearch();
      this.carWithMaterialSearch();
      this.modelCarSearch();
      this.materialSearch();
   }

   ngAfterViewInit() {}

   // Init Data Model Car
   modelCarSearchDto = new Group4LoaiXeDto();
   modelCarList: Group4LoaiXeDto[];
   filteredModelCar: any[];
   modelCarWithout: Group4LoaiXeDto;
   modelCarWith: Group4LoaiXeDto;

   filterModelCar(event) {
      this.filteredModelCar = [];
      for (let i = 0; i < this.modelCarList.length; i++) {
         let model = this.modelCarList[i];
         if (
            model.loaiXe_Ten.toLowerCase().indexOf(event.query.toLowerCase()) ==
            0
         ) {
            this.filteredModelCar.push(model);
         }
      }
   }
   modelCarSearch() {
      this._Group4LoaiXeServiceProxy
         .lOAIXE_Group4Search(this.modelCarSearchDto)
         .subscribe((result) => {
            if (result["Result"] === "-1")
               this.notify.error(result["ErrorDesc"]);
            else {
               this.modelCarList = result;
            }
         });
   }

   //Init Data Material
   materialSearchDto = new Group2VatTuSearchInput();
   materialList: Group2VatTuSearch[];
   material = new Group2VatTuSearch();
   filteredMaterial: any[];

   onChangeMaterial() {
      this.CarWithMI.vatTu_Ma = this.material.ma;
      this.CarWithoutMI.vatTu_Ma = this.material.ma;
      this.carWithMaterialSearch();
      this.carWithoutMaterialSearch();
   }

   materialSearch() {
      this._Group2VatTuServiceProxy
         .vATTU_Group2Search(this.materialSearchDto)
         .subscribe((result) => {
            if (result["Result"] === "-1")
               this.notify.error(result["ErrorDesc"]);
            else {
               this.materialList = result;
            }
         });
   }
   filterMaterial(event) {
      this.filteredMaterial = [];
      for (let i = 0; i < this.materialList.length; i++) {
         let mat = this.materialList[i];
         if (
            mat.vatTu_Ten.toLowerCase().indexOf(event.query.toLowerCase()) == 0
         ) {
            this.filteredMaterial.push(mat);
         }
      }
   }

   carWithoutMaterial = new PrimengTableHelper();
   carWithMaterial = new PrimengTableHelper();
   //

   // Init Dto Search
   CarWithoutMI = new Group2VatTuTheoXeSearchInput();
   CarWithMI = new Group2VatTuTheoXeSearchInput();

   // Init Dto Add

   MaterialCarInsert = new Group2VatTuTheoXeInsert();

   onClickAdd(int) {
      if (!this.material.ma) {
         this.notify.error("Vui lòng chọn vật tư");
      } else {
         this.MaterialCarInsert.vatTuTheoXe_MaXe = int;
         this.MaterialCarInsert.vatTuTheoXe_MaVatTu = this.material.ma;
         console.log(this.MaterialCarInsert);

         this._Group2VatTuServiceProxy
            .vATTUTHEOXE_Group2Insert(this.MaterialCarInsert)
            .subscribe((result) => {
               if (result["Result"] == "-1") {
                  this.notify.error(result["ErrorDesc"]);
               } else {
                  this.notify.success("Thêm thành công");
                  delete this.MaterialCarInsert.vatTuTheoXe_MaXe;
               }
               this.carWithoutMaterialSearch();
               this.carWithMaterialSearch();
            });
      }
   }

   DeleteItem = new Group2VatTuTheoXeDelete();

   onClickDel(int) {
      if (!this.material.ma) {
         this.notify.error("Vui lòng chọn vật tư");
      } else {
         this.DeleteItem.vatTu_Ma = this.material.ma;
         this.DeleteItem.xe_Ma = int;
         this._Group2VatTuServiceProxy
            .vATTUTHEOXE_Group2Del(this.DeleteItem)
            .subscribe((result) => {
               if (result["Result"] == "-1") {
                  this.notify.error(result["ErrorDesc"]);
               } else {
                  this.notify.success("Xoá thành công");
               }
               this.carWithoutMaterialSearch();
               this.carWithMaterialSearch();
            });
      }
   }

   carWithoutMaterialSearch() {
      this.primengTableHelper.showLoadingIndicator();
      this._Group2VatTuServiceProxy
         .vATTUTHEOXE_Group2SearchInUse(this.CarWithoutMI)
         .subscribe((result) => {
            let no = 1;
            result.forEach((item) => {
               item["no"] = no++;
            });
            this.carWithoutMaterial.totalRecordsCount = result.length;
            this.carWithoutMaterial.records = result;
            this.carWithMaterial.hideLoadingIndicator();
         });
   }

   carWithMaterialSearch() {
      this.carWithMaterial.showLoadingIndicator();
      this._Group2VatTuServiceProxy
         .vATTUTHEOXE_Group2Search(this.CarWithMI)
         .subscribe((result) => {
            let no = 1;
            result.forEach((item) => {
               item["no"] = no++;
            });
            this.carWithMaterial.totalRecordsCount = result.length;
            this.carWithMaterial.records = result;
            this.carWithMaterial.hideLoadingIndicator();
         });
   }

   //Button
   carInputSubmit() {
      this.carWithoutMaterialSearch();
   }
   carInputSubmitWith() {
      this.carWithMaterialSearch();
   }

   onSelectCarType() {
      this.CarWithoutMI.xe_MaLoaiXe = this.modelCarWithout.ma;
      this.carWithoutMaterialSearch();
   }

   onSelectCarTypeWith() {
      this.CarWithMI.xe_MaLoaiXe = this.modelCarWith.ma;
      this.carWithMaterialSearch();
   }

   onClearCarType() {
      delete this.CarWithoutMI.xe_MaLoaiXe;
      this.carWithoutMaterialSearch();
   }
   onClearCarTypeWith() {
      delete this.CarWithMI.xe_MaLoaiXe;
      this.carWithMaterialSearch();
   }

}
