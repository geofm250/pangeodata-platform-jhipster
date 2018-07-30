import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEmploymentReport } from 'app/shared/model/employment-report.model';
import { EmploymentReportService } from './employment-report.service';

@Component({
    selector: 'jhi-employment-report-update',
    templateUrl: './employment-report-update.component.html'
})
export class EmploymentReportUpdateComponent implements OnInit {
    private _employmentReport: IEmploymentReport;
    isSaving: boolean;

    constructor(private employmentReportService: EmploymentReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employmentReport }) => {
            this.employmentReport = employmentReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.employmentReport.id !== undefined) {
            this.subscribeToSaveResponse(this.employmentReportService.update(this.employmentReport));
        } else {
            this.subscribeToSaveResponse(this.employmentReportService.create(this.employmentReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmploymentReport>>) {
        result.subscribe((res: HttpResponse<IEmploymentReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get employmentReport() {
        return this._employmentReport;
    }

    set employmentReport(employmentReport: IEmploymentReport) {
        this._employmentReport = employmentReport;
    }
}
