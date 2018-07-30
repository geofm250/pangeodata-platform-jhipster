import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';
import { Principal } from 'app/core';
import { DriversLicenseCheckReportService } from './drivers-license-check-report.service';

@Component({
    selector: 'jhi-drivers-license-check-report',
    templateUrl: './drivers-license-check-report.component.html'
})
export class DriversLicenseCheckReportComponent implements OnInit, OnDestroy {
    driversLicenseCheckReports: IDriversLicenseCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private driversLicenseCheckReportService: DriversLicenseCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.driversLicenseCheckReportService.query().subscribe(
            (res: HttpResponse<IDriversLicenseCheckReport[]>) => {
                this.driversLicenseCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDriversLicenseCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDriversLicenseCheckReport) {
        return item.id;
    }

    registerChangeInDriversLicenseCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('driversLicenseCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
