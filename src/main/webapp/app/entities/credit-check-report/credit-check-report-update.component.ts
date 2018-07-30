import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICreditCheckReport } from 'app/shared/model/credit-check-report.model';
import { CreditCheckReportService } from './credit-check-report.service';

@Component({
    selector: 'jhi-credit-check-report-update',
    templateUrl: './credit-check-report-update.component.html'
})
export class CreditCheckReportUpdateComponent implements OnInit {
    private _creditCheckReport: ICreditCheckReport;
    isSaving: boolean;

    constructor(private creditCheckReportService: CreditCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ creditCheckReport }) => {
            this.creditCheckReport = creditCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.creditCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.creditCheckReportService.update(this.creditCheckReport));
        } else {
            this.subscribeToSaveResponse(this.creditCheckReportService.create(this.creditCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICreditCheckReport>>) {
        result.subscribe((res: HttpResponse<ICreditCheckReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get creditCheckReport() {
        return this._creditCheckReport;
    }

    set creditCheckReport(creditCheckReport: ICreditCheckReport) {
        this._creditCheckReport = creditCheckReport;
    }
}
