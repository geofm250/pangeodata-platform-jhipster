import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICriminalRecordReport } from 'app/shared/model/criminal-record-report.model';
import { Principal } from 'app/core';
import { CriminalRecordReportService } from './criminal-record-report.service';

@Component({
    selector: 'jhi-criminal-record-report',
    templateUrl: './criminal-record-report.component.html'
})
export class CriminalRecordReportComponent implements OnInit, OnDestroy {
    criminalRecordReports: ICriminalRecordReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private criminalRecordReportService: CriminalRecordReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.criminalRecordReportService.query().subscribe(
            (res: HttpResponse<ICriminalRecordReport[]>) => {
                this.criminalRecordReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCriminalRecordReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICriminalRecordReport) {
        return item.id;
    }

    registerChangeInCriminalRecordReports() {
        this.eventSubscriber = this.eventManager.subscribe('criminalRecordReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
