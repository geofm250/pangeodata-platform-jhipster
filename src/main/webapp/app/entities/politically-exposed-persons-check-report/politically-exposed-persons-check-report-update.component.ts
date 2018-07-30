import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';
import { PoliticallyExposedPersonsCheckReportService } from './politically-exposed-persons-check-report.service';

@Component({
    selector: 'jhi-politically-exposed-persons-check-report-update',
    templateUrl: './politically-exposed-persons-check-report-update.component.html'
})
export class PoliticallyExposedPersonsCheckReportUpdateComponent implements OnInit {
    private _politicallyExposedPersonsCheckReport: IPoliticallyExposedPersonsCheckReport;
    isSaving: boolean;

    constructor(
        private politicallyExposedPersonsCheckReportService: PoliticallyExposedPersonsCheckReportService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ politicallyExposedPersonsCheckReport }) => {
            this.politicallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.politicallyExposedPersonsCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(
                this.politicallyExposedPersonsCheckReportService.update(this.politicallyExposedPersonsCheckReport)
            );
        } else {
            this.subscribeToSaveResponse(
                this.politicallyExposedPersonsCheckReportService.create(this.politicallyExposedPersonsCheckReport)
            );
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPoliticallyExposedPersonsCheckReport>>) {
        result.subscribe(
            (res: HttpResponse<IPoliticallyExposedPersonsCheckReport>) => this.onSaveSuccess(),
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
    get politicallyExposedPersonsCheckReport() {
        return this._politicallyExposedPersonsCheckReport;
    }

    set politicallyExposedPersonsCheckReport(politicallyExposedPersonsCheckReport: IPoliticallyExposedPersonsCheckReport) {
        this._politicallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReport;
    }
}
