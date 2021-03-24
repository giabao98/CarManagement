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
import { ActivatedRoute } from '@angular/router';

import {
    Group4TuyenChayDto,
    Group4TuyenChayServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'app-roads-edit-group4',
    templateUrl: './roads-edit-group4.component.html',
    styleUrls: ['./roads-edit-group4.component.less', '../../style.less'],
    animations: [appModuleAnimation()]
})
export class RoadsEditGroup4Component extends AppComponentBase implements OnInit, AfterViewInit {
    /* *
        *
    ***/

    constructor(injector: Injector,
        private activatedRoute: ActivatedRoute,
        private group4TuyenChayServiceProxy: Group4TuyenChayServiceProxy,
    ) {
        super(injector);
        this.getRoadById();
    }
    ngOnInit() {
    }
    ngAfterViewInit(): void {
    }
    roadDTO: Group4TuyenChayDto = new Group4TuyenChayDto();

    getRoadById(): void {
        this.activatedRoute.queryParams.subscribe(paramsId => {
            this.group4TuyenChayServiceProxy.tUYENCHAY_Group4SearchById(paramsId.id).subscribe(
                (response) => {
                    this.roadDTO = response;
                }
            )
        })
    }
    updateRoad(): void {
        console.log(this.roadDTO);
        this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Update(this.roadDTO).subscribe(
            (response) => {
                if (response["Result"] === 1) {
                    this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
                } else {
                    this.roadDTO.tuyenChay_SoKm = 0;
                    this.roadDTO.tuyenChay_DiemDi = "";
                    this.roadDTO.tuyenChay_DiemDen = "";
                    this.roadDTO.tuyenChay_MucDich = "";
                    this.notify.success("Cập tuyến chạy thành công", "SUCCESS", environment.opt);
                }
            })

    }
}
