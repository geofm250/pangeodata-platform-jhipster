import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIOrderReport } from 'app/shared/model/i-order-report.model';
import { Principal } from 'app/core';
import { IOrderReportService } from './i-order-report.service';

@Component({
    selector: 'jhi-i-order-report',
    templateUrl: './i-order-report.component.html'
})
export class IOrderReportComponent implements OnInit, OnDestroy {
    iOrderReports: IIOrderReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private iOrderReportService: IOrderReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.iOrderReportService.query().subscribe(
            (res: HttpResponse<IIOrderReport[]>) => {
                this.iOrderReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIOrderReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIOrderReport) {
        return item.id;
    }

    registerChangeInIOrderReports() {
        this.eventSubscriber = this.eventManager.subscribe('iOrderReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
