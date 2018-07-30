import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';
import { CivilLitigationCheckReportService } from './civil-litigation-check-report.service';

@Component({
    selector: 'jhi-civil-litigation-check-report-update',
    templateUrl: './civil-litigation-check-report-update.component.html'
})
export class CivilLitigationCheckReportUpdateComponent implements OnInit {
    private _civilLitigationCheckReport: ICivilLitigationCheckReport;
    isSaving: boolean;

    constructor(private civilLitigationCheckReportService: CivilLitigationCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ civilLitigationCheckReport }) => {
            this.civilLitigationCheckReport = civilLitigationCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.civilLitigationCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.civilLitigationCheckReportService.update(this.civilLitigationCheckReport));
        } else {
            this.subscribeToSaveResponse(this.civilLitigationCheckReportService.create(this.civilLitigationCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICivilLitigationCheckReport>>) {
        result.subscribe(
            (res: HttpResponse<ICivilLitigationCheckReport>) => this.onSaveSuccess(),
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
    get civilLitigationCheckReport() {
        return this._civilLitigationCheckReport;
    }

    set civilLitigationCheckReport(civilLitigationCheckReport: ICivilLitigationCheckReport) {
        this._civilLitigationCheckReport = civilLitigationCheckReport;
    }
}
