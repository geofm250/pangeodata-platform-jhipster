import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';
import { Principal } from 'app/core';
import { CivilLitigationCheckReportService } from './civil-litigation-check-report.service';

@Component({
    selector: 'jhi-civil-litigation-check-report',
    templateUrl: './civil-litigation-check-report.component.html'
})
export class CivilLitigationCheckReportComponent implements OnInit, OnDestroy {
    civilLitigationCheckReports: ICivilLitigationCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private civilLitigationCheckReportService: CivilLitigationCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.civilLitigationCheckReportService.query().subscribe(
            (res: HttpResponse<ICivilLitigationCheckReport[]>) => {
                this.civilLitigationCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCivilLitigationCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICivilLitigationCheckReport) {
        return item.id;
    }

    registerChangeInCivilLitigationCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('civilLitigationCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
