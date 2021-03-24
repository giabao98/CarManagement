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

interface Error {
    message: string;
}

@Component({
    selector: 'app-roads-add-group4',
    templateUrl: './roads-add-group4.component.html',
    styleUrls: ['./roads-add-group4.component.less', '../../style.less'],
    animations: [appModuleAnimation()]
})
export class RoadsAddGroup4Component extends AppComponentBase implements OnInit, AfterViewInit {
    /* *
        *
    ***/
    constructor(injector: Injector,
        private group4TuyenChayServiceProxy: Group4TuyenChayServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit() {
    }
    ngAfterViewInit(): void {
    }
    roadDTO: Group4TuyenChayDto = new Group4TuyenChayDto();

    addNewRoad(): void {
        console.log(this.roadDTO);
        this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Insert(this.roadDTO).subscribe(
            (response) => {
                if (response["Result"] === "1") {
                    this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
                } else {
                    this.roadDTO.tuyenChay_SoKm = 0;
                    this.roadDTO.tuyenChay_DiemDi = "";
                    this.roadDTO.tuyenChay_DiemDen = "";
                    this.roadDTO.tuyenChay_MucDich = "";
                    this.notify.success("Thêm tuyến chạy thành công", "SUCCESS", environment.opt);
                }
            })
    }
}
