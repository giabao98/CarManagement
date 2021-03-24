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
import * as moment from 'moment';

import {
    Group4LichTrinhDto,
    Group4TuyenChayDto,
    Group4XeDto,
    Group4XeServiceProxy,
    Group4TuyenChayServiceProxy,
    Group4LichTrinhServiceProxy,
} from "@shared/service-proxies/service-proxies";

interface SelectOption {
    label: string;
    value: string;
}

interface Error {
    message: string;
}

interface CarOption {
    label: string,
    value: string,
}

@Component({
    selector: 'app-schedule-car-management-group4',
    templateUrl: './schedule-car-management-group4.component.html',
    styleUrls: ['./schedule-car-management-group4.component.less', '../../style.less'],
    animations: [appModuleAnimation()]

})


export class ScheduleCarManagementGroup4Component extends AppComponentBase implements OnInit, AfterViewInit {
    /**
     *
     */
    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;
    constructor(
        injector: Injector,
        private router: Router,
        private group4LichTrinhServiceProxy: Group4LichTrinhServiceProxy,
        private group4TuyenChayServiceProxy: Group4TuyenChayServiceProxy,
        private group4XeServiceProxy: Group4XeServiceProxy
    ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
    }

    currentUserName: string;
    locale_vi: any;
    ngOnInit() {
        this.locale_vi = {
            firstDayOfWeek: 0,
            dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
            dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            monthNames: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
            monthNamesShort: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
            today: 'Hôm nay',
            clear: 'Xóa'
        };
        this.search();
        this.getTuyenChay();
        this.getXe();
    }
    ngAfterViewInit(): void {
    }

    defaultValue = { label: "Tất cả", value: "-1" };

    startDestination: any = this.defaultValue;
    startDestinationOptions: Array<{}> = [];

    endDestination: any = this.defaultValue;
    endDestinationOptions: Array<{}> = [];


    // Min Date
    minStartDate: Date;
    minEndDate: Date;

    scheduleStatusOpts: Array<SelectOption> = [
        { label: "Tất cả", value: undefined },
        { label: "Chưa nhận", value: "C" },
        { label: "Đang di chuyển", value: "D" },
        { label: "Kết thúc", value: "K" },
        { label: "Đã huỷ", value: "H" },
    ];
    scheduleOpt: SelectOption;

    startEndDestinations: Array<{
        ma: number,
        nameEndDest: string,
        nameStartDest: string,
        startDest: string,
        endDest: string
    }> = [];

    curScheduleId: number;
    scheduleInput: Group4LichTrinhDto = new Group4LichTrinhDto();
    scheduleRecords: Group4LichTrinhDto[] = [];

    roadDTO: Group4TuyenChayDto = new Group4TuyenChayDto();
    roadRecords: Group4TuyenChayDto[] = [];

    carDTO: Group4XeDto = new Group4XeDto();
    carOpts: Array<CarOption> = [];
    carOpt: CarOption = this.defaultValue

    scheduleStartDateError: Error = {
        message: ""
    };
    scheduleEndDateError: Error = {
        message: ""
    };


    handleStartDateSelect($event): void {
        if (this.scheduleInput.lichTrinh_NgayDi > this.scheduleInput.lichTrinh_NgayDen) {
            this.scheduleStartDateError = {
                message: "Ngày đi không được lớn hơn ngày đến"
            };
        } else {
            this.scheduleEndDateError = {
                message: ""
            };
            this.scheduleStartDateError = {
                message: ""
            };
        }
    }

    handleEndDateSelect($event): void {
        if (this.scheduleInput.lichTrinh_NgayDen < this.scheduleInput.lichTrinh_NgayDi) {
            this.scheduleEndDateError = {
                message: "Ngày đến không được bé hơn ngày đi"
            };
        } else {
            this.scheduleEndDateError = {
                message: ""
            };
            this.scheduleStartDateError = {
                message: ""
            };
        }
    }


    checkStatusBeforeEdit(type: string): void {
        const index = this.scheduleRecords.findIndex(schedule => schedule.ma === this.curScheduleId)
        if (this.scheduleRecords[index].lichTrinh_TrangThaiChuyen !== "K") {
            this.router.navigate(['/app/admin/schedule-edit', this.curScheduleId])
        } else {
            this.notify.error("Lịch trình đã kết thúc và không được chỉnh sửa", "ERROR", environment.opt);
        }
    }


    checkIndexOfOption(array, option) {
        const index = array.findIndex(elm => elm["value"] === option["value"]);
        if (index === -1) {
            array.push(option)
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
    onSelectCar(): void {
        this.scheduleInput.lichTrinh_MaXe = parseInt(this.carOpt.value)
    }

    onSelectScheduleStatus($event): void {
        this.scheduleInput.lichTrinh_TrangThaiChuyen = $event.value.value;
    }

    delete() {
        let self = this;
        self.message.confirm(
            self.l('Xoá lịch trình này', this.curScheduleId),
            this.l('AreYouSure'),
            isConfirmed => {
                if (isConfirmed) {
                    this.group4LichTrinhServiceProxy.lICHTRINH_Group4DeleteById(this.curScheduleId).subscribe((response) => {
                        if (response["Result"] === "1") {
                            this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                        } else {
                            this.notify.success("Xóa lịch trình thành công", "SUCCESS", environment.opt);
                            this.curScheduleId = null;
                            this.search();
                        }
                    });
                }
            }
        );
    }

    getTuyenChay(): void {
        this.roadDTO.tuyenChay_TrangThaiDuyet = "D";
        this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Search(this.roadDTO)
            .subscribe((result) => {
                let no = 1;
                this.startDestinationOptions = [];
                this.endDestinationOptions = [];
                this.checkIndexOfOption(this.startDestinationOptions, this.defaultValue);
                this.checkIndexOfOption(this.endDestinationOptions, this.defaultValue);
                result.forEach((item) => {
                    item["no"] = no++;
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
            });
    }

    getXe(): void {
        this.group4XeServiceProxy.xE_Group4Search(
            this.carDTO
        ).subscribe((response) => {
            // response.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
            if (response.length >= 1) {
                let options = [];
                options.push(this.defaultValue);
                response.forEach((car) => {
                    let carOpt = {
                        label: `${car.xe_Ten} - ${car.xe_BienSo}`,
                        value: car.ma.toString(),
                    }
                    options.push(carOpt)
                })
                this.carOpts = options
            }
        })
    }

    search() {
        if (this.carOpt.value === "-1") {
            this.scheduleInput.lichTrinh_MaXe = undefined
        }
        // show loading trong gridview
        this.primengTableHelper.showLoadingIndicator();
        this.group4LichTrinhServiceProxy.lICHTRINH_Group4Search(this.scheduleInput)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                });
                console.log(result);
                this.scheduleRecords = result;
                result.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
                this.primengTableHelper.totalRecordsCount = result.length;
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }
}
