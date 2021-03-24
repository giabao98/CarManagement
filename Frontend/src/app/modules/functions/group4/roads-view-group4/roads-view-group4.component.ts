import { environment } from '../../../../../environments/environment.prod';
import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    Injector
} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    Group4TuyenChayDto,
    Group4TuyenChayServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { ModalDenyRoadGroup4 } from './../modal-group4/modal-deny-road-group4/modal-deny-road-group4.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-roads-view-group4',
    templateUrl: './roads-view-group4.component.html',
    styleUrls: ['./roads-view-group4.component.less', '../../style.less'],
    animations: [appModuleAnimation()]
})
export class RoadsViewGroup4Component extends AppComponentBase implements OnInit, AfterViewInit {
    /* *
        *
    ***/
    @ViewChild('modalDenyRoadGroup4') modalDenyRoadGroup4: ModalDenyRoadGroup4;

    constructor(injector: Injector,
        private activatedRoute: ActivatedRoute,
        private group4TuyenChayServiceProxy: Group4TuyenChayServiceProxy,
    ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
        this.getRoadById();
    }
    ngOnInit() {
        this.roadStatus = [
            {
                name: 'Chưa duyệt', value: 'C',
                className: ' m-badge--brand',
            }, {
                name: 'Đã duyệt', value: 'D',
                className: ' m-badge--success',
            }, {
                name: 'Từ chối', value: 'T',
                className: ' m-badge--danger',
            }
        ]
    }
    ngAfterViewInit(): void {
    }

    currentUserName: string;
    roadDTO: Group4TuyenChayDto = new Group4TuyenChayDto();

    roadStatus: Array<{ name, value, className }> = [];
    curRoadStatus: string
    curRoadClass: string;

    getRoadById(): void {
        this.activatedRoute.queryParams.subscribe(paramsId => {
            this.group4TuyenChayServiceProxy.tUYENCHAY_Group4SearchById(paramsId.id).subscribe(
                (response) => {
                    this.roadDTO = response;
                    this.viewRoadStatus();
                }
            )
        })
    }

    viewRoadStatus(): void {
        const index = this.roadStatus.findIndex(road => road.value === this.roadDTO.tuyenChay_TrangThaiDuyet)
        if (index !== -1) {
            this.curRoadStatus = this.roadStatus[index].name
            this.curRoadClass = this.roadStatus[index].className
        } else {
            this.curRoadStatus = 'Chưa có trạng thái'
        }
    }

    validateRoadStatus(): boolean {
        if (this.roadDTO.tuyenChay_TrangThaiDuyet === 'C') {
            return false;
        }
        return true;
    }

    close(): void {
        this.modalDenyRoadGroup4.close();
    }

    open(): void {
        this.modalDenyRoadGroup4.show(this.roadDTO.ma);
    }

    approve(): void {
        this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Approve(this.roadDTO.ma, this.currentUserName)
            .subscribe((response) => {
                if (response["Result"] === "1") {
                    this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
                } else {
                    this.notify.success("Duyệt tuyến chạy thành công", "SUCCESS", environment.opt);
                    this.getRoadById();
                }
            })
    }
}
