import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICreditCheckReport } from 'app/shared/model/credit-check-report.model';
import { Principal } from 'app/core';
import { CreditCheckReportService } from './credit-check-report.service';

@Component({
    selector: 'jhi-credit-check-report',
    templateUrl: './credit-check-report.component.html'
})
export class CreditCheckReportComponent implements OnInit, OnDestroy {
    creditCheckReports: ICreditCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private creditCheckReportService: CreditCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.creditCheckReportService.query().subscribe(
            (res: HttpResponse<ICreditCheckReport[]>) => {
                this.creditCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCreditCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICreditCheckReport) {
        return item.id;
    }

    registerChangeInCreditCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('creditCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
