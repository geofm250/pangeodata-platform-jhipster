import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReferenceCheckReport } from 'app/shared/model/reference-check-report.model';
import { Principal } from 'app/core';
import { ReferenceCheckReportService } from './reference-check-report.service';

@Component({
    selector: 'jhi-reference-check-report',
    templateUrl: './reference-check-report.component.html'
})
export class ReferenceCheckReportComponent implements OnInit, OnDestroy {
    referenceCheckReports: IReferenceCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private referenceCheckReportService: ReferenceCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.referenceCheckReportService.query().subscribe(
            (res: HttpResponse<IReferenceCheckReport[]>) => {
                this.referenceCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReferenceCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReferenceCheckReport) {
        return item.id;
    }

    registerChangeInReferenceCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('referenceCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
