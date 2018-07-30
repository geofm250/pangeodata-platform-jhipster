import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEducationReport } from 'app/shared/model/education-report.model';
import { Principal } from 'app/core';
import { EducationReportService } from './education-report.service';

@Component({
    selector: 'jhi-education-report',
    templateUrl: './education-report.component.html'
})
export class EducationReportComponent implements OnInit, OnDestroy {
    educationReports: IEducationReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private educationReportService: EducationReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.educationReportService.query().subscribe(
            (res: HttpResponse<IEducationReport[]>) => {
                this.educationReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEducationReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEducationReport) {
        return item.id;
    }

    registerChangeInEducationReports() {
        this.eventSubscriber = this.eventManager.subscribe('educationReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
