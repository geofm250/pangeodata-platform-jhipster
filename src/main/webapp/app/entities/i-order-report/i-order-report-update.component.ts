import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IIOrderReport } from 'app/shared/model/i-order-report.model';
import { IOrderReportService } from './i-order-report.service';

@Component({
    selector: 'jhi-i-order-report-update',
    templateUrl: './i-order-report-update.component.html'
})
export class IOrderReportUpdateComponent implements OnInit {
    private _iOrderReport: IIOrderReport;
    isSaving: boolean;

    constructor(private iOrderReportService: IOrderReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ iOrderReport }) => {
            this.iOrderReport = iOrderReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.iOrderReport.id !== undefined) {
            this.subscribeToSaveResponse(this.iOrderReportService.update(this.iOrderReport));
        } else {
            this.subscribeToSaveResponse(this.iOrderReportService.create(this.iOrderReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIOrderReport>>) {
        result.subscribe((res: HttpResponse<IIOrderReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get iOrderReport() {
        return this._iOrderReport;
    }

    set iOrderReport(iOrderReport: IIOrderReport) {
        this._iOrderReport = iOrderReport;
    }
}
