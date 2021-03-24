import { environment } from 'environments/environment';
import { Group2VatTuSearchInput, Group2VatTuThanhLyInput, Group2VatTuSearchThanhLyInput } from '@shared/service-proxies/service-proxies';
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
  selector: 'app-material-delete-group2',
  templateUrl: './material-delete-group2.component.html',
  styleUrls: ['./material-delete-group2.component.css', '../../style.less']
})
export class MaterialDeleteGroup2Component extends AppComponentBase implements OnInit, AfterViewInit {

  @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    constructor(injector: Injector, private Group2VatTuServiceProxy: Group2VatTuServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    currentUserName: string;
    ngOnInit() {
    }
    ngAfterViewInit(): void {
        this.search();
    }

    addFormControl = new FormControl();

    searchSelected;

    searchLists = [
        { label: "Mã", value: "ma"},
        { label: "Tên", value: "ten" },

    ];

    searchListForm = [
        { label: "Mã", name: "ma", check: false, attr: "thanhLyVatTu_MaVatTu" },
        { label: "Tên", name: "ten", check: false, attr: "thanhLyVatTu_TenVatTu" },
    ];

    changeFormSearch(event) {
        let list = event.value;
        for (let index = 0; index < this.searchListForm.length; index++) {
            const id = list.findIndex((x) => x === this.searchListForm[index].name);

            if (id >= 0) {
                this.searchListForm[index].check = true;
            } else {
                this.searchListForm[index].check = false;
                var temp = this.searchListForm[index].attr;
                delete this.materialInput[temp];
                
            }
        }
        this.search();
    }


    materialSearch :Group2VatTuSearchInput = new Group2VatTuSearchInput();
    materialId: number;
    materialName: string = '';
    materialInput : Group2VatTuSearchThanhLyInput = new Group2VatTuSearchThanhLyInput();

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

    onChangeSearch()
    {
        this.materialSearch.vatTu_Ten = this. materialName;
        this.onSearch();
    }
 
    search() {
        
        this.primengTableHelper.showLoadingIndicator();
        this.Group2VatTuServiceProxy.vATTU_Group2ThanhLySearch(this.materialInput)
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
        this.Group2VatTuServiceProxy.vATTU_Group2ThanhLySearch(this.materialInput)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                });
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    toDate(m : Moment) {
        return m.format("YYYY-MM-DD");
    }

}
