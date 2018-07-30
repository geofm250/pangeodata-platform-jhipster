import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIdentityCheckReport } from 'app/shared/model/identity-check-report.model';
import { Principal } from 'app/core';
import { IdentityCheckReportService } from './identity-check-report.service';

@Component({
    selector: 'jhi-identity-check-report',
    templateUrl: './identity-check-report.component.html'
})
export class IdentityCheckReportComponent implements OnInit, OnDestroy {
    identityCheckReports: IIdentityCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private identityCheckReportService: IdentityCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.identityCheckReportService.query().subscribe(
            (res: HttpResponse<IIdentityCheckReport[]>) => {
                this.identityCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIdentityCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIdentityCheckReport) {
        return item.id;
    }

    registerChangeInIdentityCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('identityCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
