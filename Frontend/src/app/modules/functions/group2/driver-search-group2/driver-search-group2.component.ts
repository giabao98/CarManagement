import { AppComponentBase } from '@shared/common/app-component-base';
import { Component, OnInit, ViewChild, Injector, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/primeng';
import { Group2TaiXeSearchInputDto } from '@shared/service-proxies/service-proxies';
import { Group2TaiXeServiceProxy } from '@shared/service-proxies/service-proxies';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-driver-search-group2',
    templateUrl: './driver-search-group2.component.html',
    styleUrls: ['./driver-search-group2.component.less', '../../style.less']
})
export class DriverSearchGroup2Component extends AppComponentBase implements OnInit {

    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    constructor(injector: Injector, private Group2TaiXeServiceProxy: Group2TaiXeServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
       
    }


    driverLicenses : string[] = ['B1', 'B2', 'C', 'D', 'E', 'F'];
    filteredLicenses: any[];
    license: string;

    filterLicenses(event) {
        this.filteredLicenses = [];
        for(let i = 0; i < this.driverLicenses.length; i++) {
            let brand = this.driverLicenses[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredLicenses.push(brand);
            }
        }
        console.log(this.license);
    }

    driverStatus : string[] = ['Nghỉ', 'Đang làm việc'];
    filteredStatus: any[];
    status: string;

    filterStatus(event) {
        this.filteredStatus = [];
        for(let i = 0; i < this.driverStatus.length; i++) {
            let brand = this.driverStatus[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredStatus.push(brand);
            }
        }

    }

    searchInput: Group2TaiXeSearchInputDto = new Group2TaiXeSearchInputDto();


    currentUserName: string;
    ngOnInit() {
    }
    ngAfterViewInit(): void {
        this.search();
    }


    checkIndexOfOption(array, option) {
        const index = array.findIndex(elm => elm["value"] === option["value"]);
        if (index === -1) {
            array.push(option)
        }
    }

    onClearLicense()
    {
        this.license = '';
        this.onChangeSearch();
    }
    onClearStatus()
    {
        this.status = '';
        this.onChangeSearch();
    }

    onChangeSearch() {
        this.searchInput.taiXe_HangBangLai = this.license;
        if (this.status === 'Nghỉ') {
            this.searchInput.taiXe_TrangThaiLamViec = 'N';
        }
        else if (this.status === 'Đang làm việc') {
            this.searchInput.taiXe_TrangThaiLamViec = 'D';
        } else this.searchInput.taiXe_TrangThaiLamViec = '';
        
        this.onSearch();
    }

    resetOptions() {
    }

    clearOption(type) {
    }


    delete() {
    }

    search() {
        this.primengTableHelper.showLoadingIndicator();
        this.Group2TaiXeServiceProxy.tAIXE_Group2Search(this.searchInput)
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
        this.Group2TaiXeServiceProxy.tAIXE_Group2Search(this.searchInput)
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
