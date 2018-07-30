import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEducationReport } from 'app/shared/model/education-report.model';
import { EducationReportService } from './education-report.service';

@Component({
    selector: 'jhi-education-report-update',
    templateUrl: './education-report-update.component.html'
})
export class EducationReportUpdateComponent implements OnInit {
    private _educationReport: IEducationReport;
    isSaving: boolean;

    constructor(private educationReportService: EducationReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ educationReport }) => {
            this.educationReport = educationReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.educationReport.id !== undefined) {
            this.subscribeToSaveResponse(this.educationReportService.update(this.educationReport));
        } else {
            this.subscribeToSaveResponse(this.educationReportService.create(this.educationReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEducationReport>>) {
        result.subscribe((res: HttpResponse<IEducationReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get educationReport() {
        return this._educationReport;
    }

    set educationReport(educationReport: IEducationReport) {
        this._educationReport = educationReport;
    }
}
