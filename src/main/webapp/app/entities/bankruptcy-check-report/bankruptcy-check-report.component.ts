import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';
import { Principal } from 'app/core';
import { BankruptcyCheckReportService } from './bankruptcy-check-report.service';

@Component({
    selector: 'jhi-bankruptcy-check-report',
    templateUrl: './bankruptcy-check-report.component.html'
})
export class BankruptcyCheckReportComponent implements OnInit, OnDestroy {
    bankruptcyCheckReports: IBankruptcyCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bankruptcyCheckReportService: BankruptcyCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.bankruptcyCheckReportService.query().subscribe(
            (res: HttpResponse<IBankruptcyCheckReport[]>) => {
                this.bankruptcyCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBankruptcyCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBankruptcyCheckReport) {
        return item.id;
    }

    registerChangeInBankruptcyCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('bankruptcyCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
