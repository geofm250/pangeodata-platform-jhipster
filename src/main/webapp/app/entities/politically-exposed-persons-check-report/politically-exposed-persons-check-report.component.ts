import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';
import { Principal } from 'app/core';
import { PoliticallyExposedPersonsCheckReportService } from './politically-exposed-persons-check-report.service';

@Component({
    selector: 'jhi-politically-exposed-persons-check-report',
    templateUrl: './politically-exposed-persons-check-report.component.html'
})
export class PoliticallyExposedPersonsCheckReportComponent implements OnInit, OnDestroy {
    politicallyExposedPersonsCheckReports: IPoliticallyExposedPersonsCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private politicallyExposedPersonsCheckReportService: PoliticallyExposedPersonsCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.politicallyExposedPersonsCheckReportService.query().subscribe(
            (res: HttpResponse<IPoliticallyExposedPersonsCheckReport[]>) => {
                this.politicallyExposedPersonsCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPoliticallyExposedPersonsCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPoliticallyExposedPersonsCheckReport) {
        return item.id;
    }

    registerChangeInPoliticallyExposedPersonsCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('politicallyExposedPersonsCheckReportListModification', response =>
            this.loadAll()
        );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
