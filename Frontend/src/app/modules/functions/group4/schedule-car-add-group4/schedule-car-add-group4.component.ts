import { environment } from './../../../../../environments/environment.prod';
import {
    Component,
    OnInit,
    AfterViewInit,
    Injector
} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    Group4LichTrinhDto,
    Group4TuyenChayDto,
    Group4XeDto,
    Group4XeServiceProxy,
    Group4TuyenChayServiceProxy,
    Group4LichTrinhServiceProxy,
} from "@shared/service-proxies/service-proxies";

interface SelectOption {
    name: string;
    value: string;
}

interface Error {
    message: string;
}

interface RouteOption {
    label: string;
    value: string;
    tuyenChay_DiemDi: string;
    tuyenChay_DiemDen: string;
    tuyenChay_SoKm: number;
}

interface CarOption {
    label: string,
    value: string,
    xe_BienSo: string
}

@Component({
    selector: 'app-schedule-car-add-group4',
    templateUrl: './schedule-car-add-group4.component.html',
    styleUrls: ['./schedule-car-add-group4.component.less', '../../style.less'],
    animations: [appModuleAnimation()]
})
export class ScheduleCarAddGroup4Component extends AppComponentBase implements OnInit, AfterViewInit {
    /* *
        *
    ***/
    constructor(injector: Injector,
        private group4LichTrinhServiceProxy: Group4LichTrinhServiceProxy,
        private group4TuyenChayServiceProxy: Group4TuyenChayServiceProxy,
        private group4XeServiceProxy: Group4XeServiceProxy
    ) {
        super(injector);
    }

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
        this.scheduleStatusOpts = [
            { name: "Chưa nhận", value: "C" },
            { name: "Đang di chuyển", value: "D" },
            { name: "Kết thúc", value: "K" },
            { name: "Đã huỷ", value: "H" },
        ];
        this.scheduleStatusOpt = this.scheduleStatusOpts[0];
        this.minStartDate = new Date();
        this.minEndDate = new Date();
        this.minStartDate.setDate(this.minStartDate.getDate() + 1);
        this.minEndDate.setDate(this.minEndDate.getDate() + 2);
    }
    ngAfterViewInit(): void {
        this.getTuyenChay();
        this.getXe();
    }
    // Some stuff
    locale_vi: any;
    // Min Date
    minStartDate: Date;
    minEndDate: Date;

    routeDefaultOpt: RouteOption = {
        label: "",
        value: "",
        tuyenChay_DiemDi: "",
        tuyenChay_DiemDen: "",
        tuyenChay_SoKm: 0,
    }

    carDefaultOpt: CarOption = {
        label: "",
        value: "",
        xe_BienSo: ""
    }

    scheduleDTO: Group4LichTrinhDto = new Group4LichTrinhDto();
    scheduleStatusOpts: Array<SelectOption> = [];
    scheduleStatusOpt: SelectOption;

    routeDTO: Group4TuyenChayDto = new Group4TuyenChayDto();
    routeOpts: Array<RouteOption> = [];
    routeOpt: RouteOption = this.routeDefaultOpt

    carDTO: Group4XeDto = new Group4XeDto();
    carOpts: Array<CarOption> = [];
    carOpt: CarOption = this.carDefaultOpt

    carError: Error = {
        message: ""
    };
    routeError: Error = {
        message: ""
    };
    scheduleStartDateError: Error = {
        message: ""
    };
    scheduleEndDateError: Error = {
        message: ""
    };


    handleStartDateSelect($event): void {
        if (this.scheduleDTO.lichTrinh_NgayDi > this.scheduleDTO.lichTrinh_NgayDen) {
            this.scheduleStartDateError = {
                message: "Thời gian đi không được lớn hơn thời gian đến"
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
        if (this.scheduleDTO.lichTrinh_NgayDen < this.scheduleDTO.lichTrinh_NgayDi) {
            this.scheduleEndDateError = {
                message: "Thời gian đến không được lớn hơn thời gian đi"
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

    handleRouteSelect(): void {
        this.routeError = {
            message: ""
        };
    }

    handleCarSelect(): void {
        this.carError = {
            message: ""
        };
    }

    validateInput(): boolean {
        if (
            this.carOpt.value === ""
            && this.routeOpt.value === ""
            && this.scheduleDTO.lichTrinh_NgayDi === undefined
            && this.scheduleDTO.lichTrinh_NgayDen === undefined
        ) {
            this.carError = {
                message: "Vui lòng không bỏ trống"
            };
            this.routeError = {
                message: "Vui lòng không bỏ trống"
            };
            this.scheduleStartDateError = {
                message: "Vui lòng không bỏ trống"
            };
            this.scheduleEndDateError = {
                message: "Vui lòng không bỏ trống"
            };
            return false;
        } else {
            if (this.carOpt.value === "") {
                this.carError = {
                    message: "Vui lòng không bỏ trống"
                };
                return false;
            } else if (this.routeOpt.value === "") {
                this.routeError = {
                    message: "Vui lòng không bỏ trống"
                };
                return false;
            } else if (this.scheduleDTO.lichTrinh_NgayDi === undefined) {
                this.scheduleStartDateError = {
                    message: "Vui lòng không bỏ trống"
                };
                return false;
            } else if (this.scheduleDTO.lichTrinh_NgayDen === undefined) {
                this.scheduleEndDateError = {
                    message: "Vui lòng không bỏ trống"
                };
                return false;
            } else {
                this.scheduleDTO.lichTrinh_MaTuyenChay = parseInt(this.routeOpt.value);
                this.scheduleDTO.lichTrinh_MaXe = parseInt(this.carOpt.value);
                this.scheduleDTO.lichTrinh_TrangThai = this.scheduleStatusOpt.value
                this.scheduleDTO.tuyenChay_DiemDi = this.routeOpt.tuyenChay_DiemDi;
                this.scheduleDTO.tuyenChay_DiemDen = this.routeOpt.tuyenChay_DiemDen;
                this.scheduleDTO.tuyenchay_SoKm = this.routeOpt.tuyenChay_SoKm.toString();
                return true;
            }
        }
    }

    getTuyenChay(): void {
        this.routeDTO.tuyenChay_TrangThaiDuyet = "D";
        this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Search(this.routeDTO).subscribe((response) => {
            response.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
            if (response.length >= 1) {
                let options: Array<RouteOption> = [];
                response.forEach((route) => {
                    let routeOpt = {
                        label: `${route.tuyenChay_DiemDi} - ${route.tuyenChay_DiemDen}`,
                        value: route.ma.toString(),
                        tuyenChay_DiemDi: route.tuyenChay_DiemDi,
                        tuyenChay_DiemDen: route.tuyenChay_DiemDen,
                        tuyenChay_SoKm: route.tuyenChay_SoKm,
                    }
                    options.push(routeOpt)
                })
                this.routeOpts = options
                console.log(this.routeOpts);
            }
        })
    }

    getXe(): void {
        this.group4XeServiceProxy.xE_Group4Search(
            this.carDTO
        ).subscribe((response) => {
            response.length < 1 && this.notify.error("Không tìm thấy dữ liệu", "ERROR", environment.opt);
            if (response.length >= 1) {
                let options = [];
                response.forEach((car) => {
                    let carOpt = {
                        label: `${car.xe_Ten} - ${car.xe_BienSo}`,
                        value: car.ma.toString(),
                        xe_BienSo: car.xe_BienSo,
                    }
                    options.push(carOpt)
                })
                this.carOpts = options
                console.log(this.carOpts)
            }
        })
    }

    addNewSchedule($event): void {
        event.preventDefault();
        if (this.validateInput()) {
            console.log("lichTrinh_MaTuyenChay", this.scheduleDTO.lichTrinh_MaTuyenChay);
            this.group4LichTrinhServiceProxy.lICHTRINH_Group4Insert(this.scheduleDTO).subscribe(
                (response) => {
                    if (response["Result"] === "1") {
                        this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
                    } else {
                        this.scheduleDTO.lichTrinh_MaTuyenChay = undefined;
                        this.scheduleDTO.lichTrinh_MaXe = undefined;
                        this.scheduleDTO.lichTrinh_TrangThai = this.scheduleStatusOpt.value
                        this.scheduleDTO.tuyenChay_DiemDi = "";
                        this.scheduleDTO.tuyenChay_DiemDen = "";
                        this.scheduleDTO.tuyenchay_SoKm = "";
                        this.notify.success("Thêm lịch trình thành công", "SUCCESS", environment.opt);
                    }
                })
        }
    }
}
