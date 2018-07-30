import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILicenseCheckReport } from 'app/shared/model/license-check-report.model';
import { Principal } from 'app/core';
import { LicenseCheckReportService } from './license-check-report.service';

@Component({
    selector: 'jhi-license-check-report',
    templateUrl: './license-check-report.component.html'
})
export class LicenseCheckReportComponent implements OnInit, OnDestroy {
    licenseCheckReports: ILicenseCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private licenseCheckReportService: LicenseCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.licenseCheckReportService.query().subscribe(
            (res: HttpResponse<ILicenseCheckReport[]>) => {
                this.licenseCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLicenseCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILicenseCheckReport) {
        return item.id;
    }

    registerChangeInLicenseCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('licenseCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
