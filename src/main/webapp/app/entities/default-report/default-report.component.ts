import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDefaultReport } from 'app/shared/model/default-report.model';
import { Principal } from 'app/core';
import { DefaultReportService } from './default-report.service';

@Component({
    selector: 'jhi-default-report',
    templateUrl: './default-report.component.html'
})
export class DefaultReportComponent implements OnInit, OnDestroy {
    defaultReports: IDefaultReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private defaultReportService: DefaultReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.defaultReportService.query().subscribe(
            (res: HttpResponse<IDefaultReport[]>) => {
                this.defaultReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDefaultReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDefaultReport) {
        return item.id;
    }

    registerChangeInDefaultReports() {
        this.eventSubscriber = this.eventManager.subscribe('defaultReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
