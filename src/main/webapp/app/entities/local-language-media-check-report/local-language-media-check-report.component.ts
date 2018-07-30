import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';
import { Principal } from 'app/core';
import { LocalLanguageMediaCheckReportService } from './local-language-media-check-report.service';

@Component({
    selector: 'jhi-local-language-media-check-report',
    templateUrl: './local-language-media-check-report.component.html'
})
export class LocalLanguageMediaCheckReportComponent implements OnInit, OnDestroy {
    localLanguageMediaCheckReports: ILocalLanguageMediaCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private localLanguageMediaCheckReportService: LocalLanguageMediaCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.localLanguageMediaCheckReportService.query().subscribe(
            (res: HttpResponse<ILocalLanguageMediaCheckReport[]>) => {
                this.localLanguageMediaCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocalLanguageMediaCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocalLanguageMediaCheckReport) {
        return item.id;
    }

    registerChangeInLocalLanguageMediaCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('localLanguageMediaCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
