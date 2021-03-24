import { environment } from 'environments/environment';
import { Group2TaiXeSearchInputDto } from '@shared/service-proxies/service-proxies';
import { Group2TaiXeServiceProxy } from '@shared/service-proxies/service-proxies';

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

@Component({
    selector: 'app-driver-management-group2',
    templateUrl: './driver-management-group2.component.html',
    styleUrls: ['./driver-management-group2.component.less', '../../style.less']
})
export class DriverManagementGroup2Component extends AppComponentBase implements OnInit, AfterViewInit {


    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    constructor(injector: Injector, private Group2TaiXeServiceProxy: Group2TaiXeServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    currentUserName: string;
    ngOnInit() {
    }
    ngAfterViewInit(): void {
        this.search();
    }

    driverId: number;
    driverName: string = '';
    driverInput: Group2TaiXeSearchInputDto = new Group2TaiXeSearchInputDto();

    searchSelected;

    searchLists = [
        { label: "Mã", value: "ma"},
        { label: "Tên", value: "ten" },
        { label: "Hạng bằng lái", value: "hangbanglai" },
        { label: "Lương tối thiểu", value: "luongtoithieu" },
        { label: "Lương tối đa", value: "luongtoida" },
    ];

    searchListForm = [
        { label: "Mã", name: "ma", check: false, attr: "taiXe_Ma" },
        { label: "Tên", name: "ten", check: false, attr: "taiXe_HoTen"   },
        { label: "Hạng bằng lái", name: "hangbanglai", check: false, attr: "taiXe_HangBangLai" },
        { label: "Lương tối thiểu", name: "luongtoithieu", check: false, attr: "taiXe_MucLuongNho" },
        { label: "Lương tối đa", name: "luongtoida", check: false, attr: "taiXe_MucLuongLon" },
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
                delete this.driverInput[temp];
                
            }
        }
        this.search();
    }

    onChangeSearch() {
        this.onSearch();
    }

    resetOptions() {
    }

    clearOption(type) {
    }


    delete() {
        let self = this;
        self.message.confirm(
            self.l('Xác nhận xóa tài xế', this.driverId),
            this.l(''),
            isConfirmed => {
                if (isConfirmed) {
                    this.Group2TaiXeServiceProxy.tAIXE_Group2Del(this.driverId).subscribe((response) => {
                        if (response["Result"] === "1") {
                            this.notify.error("Xóa tài xế thất bại", "ERROR", environment.opt);
                        } else {
                            this.notify.success("Xóa tài xế thành công", "SUCCESS", environment.opt);
                            this.resetOptions();
                            this.driverId = null;
                            this.search();
                        }
                    });
                }
            }
        );
    }

    search() {
        this.primengTableHelper.showLoadingIndicator();
        this.Group2TaiXeServiceProxy.tAIXE_Group2Search(this.driverInput)
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
        this.Group2TaiXeServiceProxy.tAIXE_Group2Search(this.driverInput)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                });
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

}
