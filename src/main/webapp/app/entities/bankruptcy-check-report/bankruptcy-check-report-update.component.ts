import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';
import { BankruptcyCheckReportService } from './bankruptcy-check-report.service';

@Component({
    selector: 'jhi-bankruptcy-check-report-update',
    templateUrl: './bankruptcy-check-report-update.component.html'
})
export class BankruptcyCheckReportUpdateComponent implements OnInit {
    private _bankruptcyCheckReport: IBankruptcyCheckReport;
    isSaving: boolean;

    constructor(private bankruptcyCheckReportService: BankruptcyCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bankruptcyCheckReport }) => {
            this.bankruptcyCheckReport = bankruptcyCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bankruptcyCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.bankruptcyCheckReportService.update(this.bankruptcyCheckReport));
        } else {
            this.subscribeToSaveResponse(this.bankruptcyCheckReportService.create(this.bankruptcyCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBankruptcyCheckReport>>) {
        result.subscribe(
            (res: HttpResponse<IBankruptcyCheckReport>) => this.onSaveSuccess(),
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
    get bankruptcyCheckReport() {
        return this._bankruptcyCheckReport;
    }

    set bankruptcyCheckReport(bankruptcyCheckReport: IBankruptcyCheckReport) {
        this._bankruptcyCheckReport = bankruptcyCheckReport;
    }
}
