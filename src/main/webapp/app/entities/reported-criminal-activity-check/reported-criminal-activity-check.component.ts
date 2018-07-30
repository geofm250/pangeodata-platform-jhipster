import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';
import { Principal } from 'app/core';
import { ReportedCriminalActivityCheckService } from './reported-criminal-activity-check.service';

@Component({
    selector: 'jhi-reported-criminal-activity-check',
    templateUrl: './reported-criminal-activity-check.component.html'
})
export class ReportedCriminalActivityCheckComponent implements OnInit, OnDestroy {
    reportedCriminalActivityChecks: IReportedCriminalActivityCheck[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reportedCriminalActivityCheckService: ReportedCriminalActivityCheckService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.reportedCriminalActivityCheckService.query().subscribe(
            (res: HttpResponse<IReportedCriminalActivityCheck[]>) => {
                this.reportedCriminalActivityChecks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReportedCriminalActivityChecks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReportedCriminalActivityCheck) {
        return item.id;
    }

    registerChangeInReportedCriminalActivityChecks() {
        this.eventSubscriber = this.eventManager.subscribe('reportedCriminalActivityCheckListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
