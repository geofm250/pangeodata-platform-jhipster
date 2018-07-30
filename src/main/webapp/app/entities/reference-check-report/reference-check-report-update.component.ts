import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReferenceCheckReport } from 'app/shared/model/reference-check-report.model';
import { ReferenceCheckReportService } from './reference-check-report.service';

@Component({
    selector: 'jhi-reference-check-report-update',
    templateUrl: './reference-check-report-update.component.html'
})
export class ReferenceCheckReportUpdateComponent implements OnInit {
    private _referenceCheckReport: IReferenceCheckReport;
    isSaving: boolean;

    constructor(private referenceCheckReportService: ReferenceCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ referenceCheckReport }) => {
            this.referenceCheckReport = referenceCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.referenceCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.referenceCheckReportService.update(this.referenceCheckReport));
        } else {
            this.subscribeToSaveResponse(this.referenceCheckReportService.create(this.referenceCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReferenceCheckReport>>) {
        result.subscribe(
            (res: HttpResponse<IReferenceCheckReport>) => this.onSaveSuccess(),
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
    get referenceCheckReport() {
        return this._referenceCheckReport;
    }

    set referenceCheckReport(referenceCheckReport: IReferenceCheckReport) {
        this._referenceCheckReport = referenceCheckReport;
    }
}
