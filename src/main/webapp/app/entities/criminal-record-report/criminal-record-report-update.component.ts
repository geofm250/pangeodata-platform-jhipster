import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICriminalRecordReport } from 'app/shared/model/criminal-record-report.model';
import { CriminalRecordReportService } from './criminal-record-report.service';

@Component({
    selector: 'jhi-criminal-record-report-update',
    templateUrl: './criminal-record-report-update.component.html'
})
export class CriminalRecordReportUpdateComponent implements OnInit {
    private _criminalRecordReport: ICriminalRecordReport;
    isSaving: boolean;

    constructor(private criminalRecordReportService: CriminalRecordReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ criminalRecordReport }) => {
            this.criminalRecordReport = criminalRecordReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.criminalRecordReport.id !== undefined) {
            this.subscribeToSaveResponse(this.criminalRecordReportService.update(this.criminalRecordReport));
        } else {
            this.subscribeToSaveResponse(this.criminalRecordReportService.create(this.criminalRecordReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICriminalRecordReport>>) {
        result.subscribe(
            (res: HttpResponse<ICriminalRecordReport>) => this.onSaveSuccess(),
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
    get criminalRecordReport() {
        return this._criminalRecordReport;
    }

    set criminalRecordReport(criminalRecordReport: ICriminalRecordReport) {
        this._criminalRecordReport = criminalRecordReport;
    }
}
