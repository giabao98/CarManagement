import { environment } from './../../../../../../environments/environment.hmr';
import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, Output, ViewChild, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    Group4TuyenChayDto,
    Group4TuyenChayServiceProxy
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'modalDenyRoadGroup4',
    templateUrl: './modal-deny-road-group4.component.html'
})
export class ModalDenyRoadGroup4 extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild('reasonInput') reasonInput: ElementRef;
    @ViewChild('denyRoadModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private group4TuyenChayServiceProxy: Group4TuyenChayServiceProxy

    ) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;

    }
    ngOnInit() {

    }
    ngAfterViewInit(): void {
    }


    currentUserName: string;
    curRoadId: number;
    reason: string;

    saving: boolean = false;

    tuyenChayInput: Group4TuyenChayDto = new Group4TuyenChayDto();
    tuyenChayRecords: Group4TuyenChayDto[] = [];

    onShown(): void {
        $(this.reasonInput.nativeElement).focus();
    }

    save(): void {
        this.group4TuyenChayServiceProxy.tUYENCHAY_Group4Reject(this.curRoadId, this.currentUserName, this.reason).pipe(
            finalize(() => this.saving = false))
            .subscribe((response) => {
                if (response["Result"] === "1") {
                    this.notify.error(response["ErrorDesc"], "ERROR", environment.opt);
                } else {
                    this.notify.success("Từ chối tuyến chạy thành công", "SUCCESS", environment.opt);
                    this.close();
                    this.modalSave.emit(null);
                }
            })
        this.saving = true;
    }
    show(id: number): void {
        console.log("id", id);
        this.curRoadId = id;
        this.modal.show();
    }
    close(): void {
        this.modal.hide();
    }
}
