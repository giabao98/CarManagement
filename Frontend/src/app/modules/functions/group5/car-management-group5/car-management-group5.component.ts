import {
  Component,
  OnInit,
  Injector,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { environment } from "environments/environment";
import { Table } from "primeng/components/table/table";
import { Paginator, SelectItem } from "primeng/primeng";
import {
  Group4XeDto,
  Group4XeServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-car-management-group5",
  templateUrl: "./car-management-group5.component.html",
  styleUrls: ["./car-management-group5.component.css", "../../style.less"],
})
export class CarManagementGroup5Component extends AppComponentBase
  implements OnInit {
  currentId: number;
  cars: Group4XeDto[] = [];
  car: Group4XeDto = new Group4XeDto();
  curCarTypeId;
  currentUserName: string;

  formSearch: FormGroup;
  submitted = false;

  searchSelected;

  searchLists = [
    { label: "Tên", value: "ten" },
    { label: "Biển số", value: "bienso" },
    { label: "Màu", value: "mau" },
    { label: "Tên loại xe", value: "tenloaixe" },
    { label: "Hãng", value: "hang" },
    { label: "Năm sản xuất", value: "nsx" },
  ];

  searchListForm = [
    { label: "Tên", name: "ten", check: false, attr: "xe_Ten" },
    { label: "Biển số", name: "bienso", check: false, attr: "xe_BienSo" },
    { label: "Màu", name: "mau", check: false, attr: "xe_Mau" },
    {
      label: "Tên loại xe",
      name: "tenloaixe",
      check: false,
      attr: "loaiXe_Ten",
    },
    { label: "Hãng", name: "hang", check: false, attr: "loaiXe_Hang" },
    { label: "Năm sản xuất", name: "nsx", check: false, attr: "loaiXe_NamSX" },
  ];

  @ViewChild("dataTable") dataTable: Table;
  @ViewChild("paginator") paginator: Paginator;

  constructor(
    injector: Injector,
    private group5Proxy: Group4XeServiceProxy,
    private formBuilder: FormBuilder
  ) {
    super(injector);
    this.currentUserName = this.appSession.user.userName;
  }

  ngOnInit() {
    this.search();

    this.formSearch = this.formBuilder.group({
      id: [""],
      carNumber: [
        "",
        Validators.pattern(/^([0-9]){2} + ([A-Z]){1,2} + - + ([0-9]){4,5}$/),
      ],
      type: [""],
      brand: [""],
    });
  }

  get f() {
    return this.formSearch.controls;
  }

  changeFormSearch(event) {
    let list = event.value;

    for (let index = 0; index < this.searchListForm.length; index++) {
      const id = list.findIndex((x) => x === this.searchListForm[index].name);

      if (id >= 0) {
        this.searchListForm[index].check = true;
      } else this.searchListForm[index].check = false;
    }
  }

  search() {

    console.log(this.car);

    this.group5Proxy.xE_Group4Search(this.car).subscribe((response) => {
      if (response["Result"] === "-1") {
        this.notify.error(response["ErrorDesc"]);
      } else {
        this.cars = response;

        this.primengTableHelper.totalRecordsCount = response.length;
        this.primengTableHelper.records = response;
        this.primengTableHelper.hideLoadingIndicator();
      }
    });
  }
}
