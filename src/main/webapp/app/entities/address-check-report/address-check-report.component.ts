import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAddressCheckReport } from 'app/shared/model/address-check-report.model';
import { Principal } from 'app/core';
import { AddressCheckReportService } from './address-check-report.service';

@Component({
    selector: 'jhi-address-check-report',
    templateUrl: './address-check-report.component.html'
})
export class AddressCheckReportComponent implements OnInit, OnDestroy {
    addressCheckReports: IAddressCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private addressCheckReportService: AddressCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.addressCheckReportService.query().subscribe(
            (res: HttpResponse<IAddressCheckReport[]>) => {
                this.addressCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAddressCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAddressCheckReport) {
        return item.id;
    }

    registerChangeInAddressCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('addressCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
