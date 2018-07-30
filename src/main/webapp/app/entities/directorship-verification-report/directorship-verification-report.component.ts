import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';
import { Principal } from 'app/core';
import { DirectorshipVerificationReportService } from './directorship-verification-report.service';

@Component({
    selector: 'jhi-directorship-verification-report',
    templateUrl: './directorship-verification-report.component.html'
})
export class DirectorshipVerificationReportComponent implements OnInit, OnDestroy {
    directorshipVerificationReports: IDirectorshipVerificationReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private directorshipVerificationReportService: DirectorshipVerificationReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.directorshipVerificationReportService.query().subscribe(
            (res: HttpResponse<IDirectorshipVerificationReport[]>) => {
                this.directorshipVerificationReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDirectorshipVerificationReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDirectorshipVerificationReport) {
        return item.id;
    }

    registerChangeInDirectorshipVerificationReports() {
        this.eventSubscriber = this.eventManager.subscribe('directorshipVerificationReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
