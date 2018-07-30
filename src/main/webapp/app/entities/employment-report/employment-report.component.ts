import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmploymentReport } from 'app/shared/model/employment-report.model';
import { Principal } from 'app/core';
import { EmploymentReportService } from './employment-report.service';

@Component({
    selector: 'jhi-employment-report',
    templateUrl: './employment-report.component.html'
})
export class EmploymentReportComponent implements OnInit, OnDestroy {
    employmentReports: IEmploymentReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private employmentReportService: EmploymentReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.employmentReportService.query().subscribe(
            (res: HttpResponse<IEmploymentReport[]>) => {
                this.employmentReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmploymentReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmploymentReport) {
        return item.id;
    }

    registerChangeInEmploymentReports() {
        this.eventSubscriber = this.eventManager.subscribe('employmentReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
