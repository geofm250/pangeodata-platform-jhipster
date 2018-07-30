import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';
import { LocalLanguageMediaCheckReportService } from './local-language-media-check-report.service';

@Component({
    selector: 'jhi-local-language-media-check-report-update',
    templateUrl: './local-language-media-check-report-update.component.html'
})
export class LocalLanguageMediaCheckReportUpdateComponent implements OnInit {
    private _localLanguageMediaCheckReport: ILocalLanguageMediaCheckReport;
    isSaving: boolean;

    constructor(
        private localLanguageMediaCheckReportService: LocalLanguageMediaCheckReportService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ localLanguageMediaCheckReport }) => {
            this.localLanguageMediaCheckReport = localLanguageMediaCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.localLanguageMediaCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.localLanguageMediaCheckReportService.update(this.localLanguageMediaCheckReport));
        } else {
            this.subscribeToSaveResponse(this.localLanguageMediaCheckReportService.create(this.localLanguageMediaCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocalLanguageMediaCheckReport>>) {
        result.subscribe(
            (res: HttpResponse<ILocalLanguageMediaCheckReport>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get localLanguageMediaCheckReport() {
        return this._localLanguageMediaCheckReport;
    }

    set localLanguageMediaCheckReport(localLanguageMediaCheckReport: ILocalLanguageMediaCheckReport) {
        this._localLanguageMediaCheckReport = localLanguageMediaCheckReport;
    }
}
