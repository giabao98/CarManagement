import { environment } from './../../../../../environments/environment.prod';
import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    Injector
} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
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
    selector: 'app-schedule-car-edit-group4',
    templateUrl: './schedule-car-edit-group4.component.html',
    styleUrls: ['./schedule-car-edit-group4.component.less', '../../style.less'],
    animations: [appModuleAnimation()]
})
export class ScheduleCarEditGroup4Component extends AppComponentBase implements OnInit, AfterViewInit {
    /* *
        *
    ***/
    scheduleDTO: Group4LichTrinhDto = new Group4LichTrinhDto();

    constructor(injector: Injector,
        private router: Router,
        private activatedRoute: ActivatedRoute,
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
        this.minStartDate = new Date();
        this.minEndDate = new Date();
        this.minStartDate.setDate(this.minStartDate.getDate() + 1);
        this.minEndDate.setDate(this.minEndDate.getDate() + 2);
        this.getScheduleById();
    }
    ngAfterViewInit(): void {

    }
    // Some stuff
    locale_vi: any;
    temptStartDate: Date;
    temptEndDate: Date;
    isReadOnly: boolean = false;

    // Min, Max Date
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

    handleEnableEdit(): void {
        this.activatedRoute.params.subscribe(paramsId => {
            this.router.navigate(['/app/admin/schedule-cars-edit', paramsId.id])
        })
    }


    handleStartDateSelect($event): void {
        if (this.temptStartDate > this.temptEndDate) {
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
        if (this.temptEndDate < this.temptStartDate) {
            this.scheduleEndDateError = {
                message: "Thời gian đến không được bé hơn thời gian đi"
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

    handleSelect($event): void {
        console.log("new Date", new Date());
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
                this.scheduleDTO.lichTrinh_NgayDi = moment(this.temptStartDate);
                this.scheduleDTO.lichTrinh_NgayDen = moment(this.temptEndDate);
                this.scheduleDTO.lichTrinh_MaTuyenChay = parseInt(this.routeOpt.value);
                this.scheduleDTO.lichTrinh_MaXe = parseInt(this.carOpt.value);
                this.scheduleDTO.lichTrinh_TrangThaiChuyen = this.scheduleStatusOpt.value
                this.scheduleDTO.tuyenChay_DiemDi = this.routeOpt.tuyenChay_DiemDi;
                this.scheduleDTO.tuyenChay_DiemDen = this.routeOpt.tuyenChay_DiemDen;
                this.scheduleDTO.tuyenchay_SoKm = this.routeOpt.tuyenChay_SoKm.toString();
                return true;
            }
        }
    }

    getScheduleById(): void {
        this.activatedRoute.queryParams.subscribe(queryParam => {
            if (queryParam.isReadOnly && queryParam.isReadOnly === "true") {
                this.isReadOnly = true;
            } else {
                this.isReadOnly = false;
            }
        })
        this.activatedRoute.params.subscribe(paramsId => {
            this.group4LichTrinhServiceProxy.lICTRINH_Group4SearchById(paramsId.id).subscribe(
                (response) => {
                    this.scheduleDTO = response;
                    this.temptStartDate = new Date(moment(this.scheduleDTO.lichTrinh_NgayDi).format("L HH:mm:ss"));
                    this.temptEndDate = new Date(moment(this.scheduleDTO.lichTrinh_NgayDen).format("L HH:mm:ss"));
                    this.scheduleStatusOpt = this.scheduleStatusOpts.find(statusOpt => statusOpt.value === this.scheduleDTO.lichTrinh_TrangThaiChuyen);
                    this.getTuyenChay();
                    this.getXe();
                }
            )
        });
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
                this.routeOpt = this.routeOpts.find(route => route.value === this.scheduleDTO.lichTrinh_MaTuyenChay.toString())
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
                this.carOpts = options;
                this.carOpt = this.carOpts.find(route => parseInt(route.value) === this.scheduleDTO.lichTrinh_MaXe)
            }
        })
    }

    updateSchedule($event): void {
        event.preventDefault();
        if (this.validateInput()) {
            console.log(this.scheduleDTO)
            this.group4LichTrinhServiceProxy.lICHTRINH_Group4Update(this.scheduleDTO).subscribe(
                (response) => {
                    if (response["Result"] === "1") {
                        this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
                    } else {
                        this.notify.success("Cập nhật lịch trình thành công", "SUCCESS", environment.opt);
                    }
                })
        }
    }
}
