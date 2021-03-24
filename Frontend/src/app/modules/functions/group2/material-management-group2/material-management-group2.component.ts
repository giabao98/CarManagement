import { environment } from 'environments/environment';
import { Group2VatTuSearchInput, Group2VatTuThanhLyInput } from '@shared/service-proxies/service-proxies';
import { Group2VatTuServiceProxy } from '@shared/service-proxies/service-proxies';
import { FormControl } from '@angular/forms';
import {
    Component,
    ViewChild,
    OnInit,
    AfterViewInit,
    Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";
import { Moment } from 'moment';

@Component({
    selector: 'app-material-management-group2',
    templateUrl: './material-management-group2.component.html',
    styleUrls: ['./material-management-group2.component.css', '../../style.less']
})
export class MaterialManagementGroup2Component extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    constructor(injector: Injector, private Group2VatTuServiceProxy: Group2VatTuServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    searchSelected;

    searchLists = [
        { label: "Mã vật tư", value: "ma" },
        { label: "Tên vật tư", value: "ten" },

    ];
    searchListForm = [
        { label: "Mã vật tư", name: "ma", check: false, attr: "vatTu_Ma" },
        { label: "Tên", name: "ten", check: false, attr: "vatTu_Ten" },
      ];

    changeFormSearch(event) {
        let list = event.value;
    
        for (let index = 0; index < this.searchListForm.length; index++) {
          const id = list.findIndex((x) => x === this.searchListForm[index].name);
    
          if (id >= 0) {
            this.searchListForm[index].check = true;
          } else this.searchListForm[index].check = false;
        }
      }

    currentUserName: string;
    ngOnInit() {
    }
    ngAfterViewInit(): void {
        this.search();
    }

    addFormControl = new FormControl();


    materialSearch: Group2VatTuSearchInput = new Group2VatTuSearchInput();
    materialId: number;
    materialName: string = '';
    thanhlyvattu: Group2VatTuThanhLyInput = new Group2VatTuThanhLyInput();

    checkIndexOfOption(array, option) {
        const index = array.findIndex(elm => elm["value"] === option["value"]);
        if (index === -1) {
            array.push(option)
        }
    }

    resetForm() {
        this.addFormControl.reset();
    }

    finalConfirm() {
        console.log(this.materialSearch);
    }

    cancelConfirm() {
        this.materialSearch = new Group2VatTuSearchInput();
    }

    onChangeSearch() {
        this.onSearch();
    }
    deleteMaterial() {
        let self = this;
        self.message.confirm(
            self.l('Xác nhận xóa vật tư', this.materialId),
            this.l(''),
            isConfirmed => {
                if (isConfirmed) {
                    this.Group2VatTuServiceProxy.vATTU_Group2ThanhLy(this.thanhlyvattu).subscribe((response) => {
                        if (response["Result"] === "1") {
                            this.notify.error("Xóa vật tư thất bại", "ERROR", environment.opt);
                        } else {
                            this.notify.success("Xóa vật tư thành công ", "SUCCESS", environment.opt);
                            this.materialId = null;
                            this.search();
                        }
                    });
                }
            }
        );
    }

    search() {
        this.materialSearch.vatTu_TrangThai = 'N';
        this.primengTableHelper.showLoadingIndicator();
        this.Group2VatTuServiceProxy.vATTU_Group2Search(this.materialSearch)
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
        this.materialSearch.vatTu_TrangThai = 'N';
        this.primengTableHelper.showLoadingIndicator();
        this.Group2VatTuServiceProxy.vATTU_Group2Search(this.materialSearch)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                });
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    toDate(m: Moment) {
        return m.format("YYYY-MM-DD");
    }

}
