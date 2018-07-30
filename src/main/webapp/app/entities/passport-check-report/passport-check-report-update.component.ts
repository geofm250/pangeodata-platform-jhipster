import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPassportCheckReport } from 'app/shared/model/passport-check-report.model';
import { PassportCheckReportService } from './passport-check-report.service';

@Component({
    selector: 'jhi-passport-check-report-update',
    templateUrl: './passport-check-report-update.component.html'
})
export class PassportCheckReportUpdateComponent implements OnInit {
    private _passportCheckReport: IPassportCheckReport;
    isSaving: boolean;

    constructor(private passportCheckReportService: PassportCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ passportCheckReport }) => {
            this.passportCheckReport = passportCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.passportCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.passportCheckReportService.update(this.passportCheckReport));
        } else {
            this.subscribeToSaveResponse(this.passportCheckReportService.create(this.passportCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPassportCheckReport>>) {
        result.subscribe((res: HttpResponse<IPassportCheckReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get passportCheckReport() {
        return this._passportCheckReport;
    }

    set passportCheckReport(passportCheckReport: IPassportCheckReport) {
        this._passportCheckReport = passportCheckReport;
    }
}
