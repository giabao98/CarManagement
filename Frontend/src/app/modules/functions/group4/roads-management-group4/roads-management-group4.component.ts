import { environment } from './../../../../../environments/environment.prod';
import {
    Component,
    ViewChild,
    OnInit,
    AfterViewInit,
    Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from "primeng/table";
import { Paginator } from "primeng/paginator";
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from "@angular/router"
import {
    Group4TuyenChayServiceProxy,
    Group4TuyenChayDto
} from "@shared/service-proxies/service-proxies";

interface SelectOption {
    label: string;
    value: any;
}

@Component({
    selector: 'app-roads-management-group4',
    templateUrl: './roads-management-group4.component.html',
    styleUrls: ['./roads-management-group4.component.less', '../../style.less'],
    animations: [appModuleAnimation()]

})


export class RoadsManagementGroup4Component extends AppComponentBase implements OnInit, AfterViewInit {
    /**
     *
     */
    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    constructor(
        injector: Injector,
        private router: Router,
        private group4TuyenChayServiceProxy: Group4TuyenChayServiceProxy,
    ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    currentUserName: string;
    ngOnInit() {
        this.search();
    }
    ngAfterViewInit(): void {
    }

    startEndDestinations: Array<{
        ma: number,
        nameEndDest: string,
        nameStartDest: string,
        startDest: string,
        endDest: string
    }> = [];

    defaultValue = { label: "Tất cả", value: "-1" };

    startDestination: any = this.defaultValue;
    startDestinationOptions: Array<{}> = [];

    endDestination: any = this.defaultValue;
    endDestinationOptions: Array<{}> = [];

    roadStatus: any = { label: "Tất cả", value: undefined }
    roadStatusOptions: Array<{}> = [
        { label: "Tất cả", value: undefined },
        { label: "Chưa duyệt", value: "C" },
        { label: "Đã duyệt", value: "D" },
        { label: "Từ chối", value: "T" },
    ];

    roadDistance: Array<number> = [-1];
    roadDistanceMin: number;
    roadDistanceMax: number;

    roadDTO: Group4TuyenChayDto = new Group4TuyenChayDto();
    curRoadId: string;

    roadRecords: Group4TuyenChayDto[] = [];

    checkStatusBeforeEdit(type: string): void {
        const index = this.roadRecords.findIndex(road => road.ma === parseInt(this.curRoadId))
        if (this.roadRecords[index].tuyenChay_TrangThaiDuyet === "C") {
            this.router.navigate(['/app/admin/road-edit'],
            { queryParams: { id: this.curRoadId } }
            )
        } else {
            this.notify.error("Tuyến chạy đã được duyệt và không được chỉnh sửa", "ERROR", environment.opt);
        }
    }

    onSelectStartDestination(): void {
        if (this.startDestination === "-1") {
            this.roadDTO.tuyenChay_DiemDi = undefined;
            this.checkIndexOfOption(this.endDestinationOptions, this.defaultValue)
            this.startEndDestinations.forEach(item => {
                let endDest = {
                    label: item.nameEndDest,
                    value: item.endDest
                }
                this.checkIndexOfOption(this.endDestinationOptions, endDest)
            })
        } else {
            this.roadDTO.tuyenChay_DiemDi = this.startDestination;
            let tempt = this.startEndDestinations.filter(destination => {
                return destination.startDest === this.startDestination
            })
            if (tempt) {
                this.endDestinationOptions = [];
                this.checkIndexOfOption(this.endDestinationOptions, this.defaultValue)
                tempt.forEach(item => {
                    let endDest = {
                        label: item.nameEndDest,
                        value: item.endDest
                    }
                    this.checkIndexOfOption(this.endDestinationOptions, endDest)
                })
            }
        }
    }

    onSelectEndDestination(): void {
        if (this.endDestination === "-1") {
            this.roadDTO.tuyenChay_DiemDen = undefined;
            this.checkIndexOfOption(this.startDestinationOptions, this.defaultValue)
            this.startEndDestinations.forEach(item => {
                let startDest = {
                    label: item.nameStartDest,
                    value: item.startDest
                }
                this.checkIndexOfOption(this.startDestinationOptions, startDest)
            })
        } else {
            console.log(this.endDestination);
            this.roadDTO.tuyenChay_DiemDen = this.endDestination;
            let tempt = this.startEndDestinations.filter(destination => {
                return destination.endDest === this.endDestination
            })
            if (tempt) {
                this.startDestinationOptions = [];
                this.checkIndexOfOption(this.startDestinationOptions, this.defaultValue)
                tempt.forEach(item => {
                    let startDest = {
                        label: item.nameStartDest,
                        value: item.startDest
                    }
                    this.checkIndexOfOption(this.startDestinationOptions, startDest)
                })
            }
        }
    }

    onSelectRoadStatus(): void {
        this.roadDTO.tuyenChay_TrangThaiDuyet = this.roadStatus;
    }

    onRowSelect(id): void {
        this.curRoadId = id
        this.router.navigate(['/app/admin/road-view', this.curRoadId])
    }

    onChoose(event): void {
        console.log(event)
    }

    checkIndexOfOption(array, option) {
        const index = array.findIndex(elm => elm["value"] === option["value"]);
        if (index === -1) {
            array.push(option)
        }
    }


    delete() {
        let self = this;
        self.message.confirm(
            self.l('Xoá tuyến chạy này', this.curRoadId),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Delete(parseInt(this.curRoadId)).subscribe((response) => {
                        if (response["Result"] === "1") {
                            this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                        } else {
                            this.notify.success("Xóa tuyến chạy thành công", "SUCCESS", environment.opt);
                            this.curRoadId = null;
                            this.search();
                        }
                    });
                }
            }
        );
    }

    temptDistance: number = 0;

    search() {
        if (this.roadDTO.tuyenChay_SoKmBatDau === undefined) {
            this.roadDTO.tuyenChay_SoKmBatDau = 0;
        }
        if (this.roadDTO.tuyenChay_SoKmBatDau === undefined) {
            this.roadDTO.tuyenChay_SoKmKetThuc = 0;
        }
        // show loading trong gridview
        this.primengTableHelper.showLoadingIndicator();
        this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Search(this.roadDTO)
            .subscribe((result) => {
                let no = 1;
                let maxDistance = 0;
                let itemDistance = 0;
                this.startDestinationOptions = [];
                this.endDestinationOptions = [];
                this.checkIndexOfOption(this.startDestinationOptions, this.defaultValue);
                this.checkIndexOfOption(this.endDestinationOptions, this.defaultValue);
                result.forEach((item) => {
                    item["no"] = no++;
                    itemDistance = item["tuyenChay_SoKm"];
                    if (maxDistance <= itemDistance) {
                        maxDistance = itemDistance;
                    }
                    let startDest = {
                        label: item.tuyenChay_DiemDi,
                        value: item.tuyenChay_DiemDi.toLowerCase()
                    }
                    let endDestination = {
                        label: item.tuyenChay_DiemDen,
                        value: item.tuyenChay_DiemDen.toLowerCase()
                    }
                    let startEndDest = {
                        ma: item.ma,
                        nameStartDest: item.tuyenChay_DiemDi,
                        nameEndDest: item.tuyenChay_DiemDen,
                        startDest: item.tuyenChay_DiemDi.toLowerCase(),
                        endDest: item.tuyenChay_DiemDen.toLowerCase()
                    }
                    if (this.startEndDestinations.findIndex(destination => destination.ma === item.ma) === -1) {
                        this.startEndDestinations.push(startEndDest)
                    }
                    this.checkIndexOfOption(this.startDestinationOptions, startDest);
                    this.checkIndexOfOption(this.endDestinationOptions, endDestination);
                });

                this.roadDistanceMax = maxDistance;
                if (this.roadDistance[0] === -1) {
                    this.roadDistance = [0, maxDistance];
                }
                result.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                this.primengTableHelper.totalRecordsCount = result.length;
                this.primengTableHelper.records = result;
                this.roadRecords = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }
}
