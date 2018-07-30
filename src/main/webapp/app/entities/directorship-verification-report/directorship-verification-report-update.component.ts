import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';
import { DirectorshipVerificationReportService } from './directorship-verification-report.service';

@Component({
    selector: 'jhi-directorship-verification-report-update',
    templateUrl: './directorship-verification-report-update.component.html'
})
export class DirectorshipVerificationReportUpdateComponent implements OnInit {
    private _directorshipVerificationReport: IDirectorshipVerificationReport;
    isSaving: boolean;

    constructor(
        private directorshipVerificationReportService: DirectorshipVerificationReportService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ directorshipVerificationReport }) => {
            this.directorshipVerificationReport = directorshipVerificationReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.directorshipVerificationReport.id !== undefined) {
            this.subscribeToSaveResponse(this.directorshipVerificationReportService.update(this.directorshipVerificationReport));
        } else {
            this.subscribeToSaveResponse(this.directorshipVerificationReportService.create(this.directorshipVerificationReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDirectorshipVerificationReport>>) {
        result.subscribe(
            (res: HttpResponse<IDirectorshipVerificationReport>) => this.onSaveSuccess(),
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
    get directorshipVerificationReport() {
        return this._directorshipVerificationReport;
    }

    set directorshipVerificationReport(directorshipVerificationReport: IDirectorshipVerificationReport) {
        this._directorshipVerificationReport = directorshipVerificationReport;
    }
}
