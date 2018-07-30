import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDefaultReport } from 'app/shared/model/default-report.model';
import { DefaultReportService } from './default-report.service';

@Component({
    selector: 'jhi-default-report-update',
    templateUrl: './default-report-update.component.html'
})
export class DefaultReportUpdateComponent implements OnInit {
    private _defaultReport: IDefaultReport;
    isSaving: boolean;

    constructor(private defaultReportService: DefaultReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ defaultReport }) => {
            this.defaultReport = defaultReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.defaultReport.id !== undefined) {
            this.subscribeToSaveResponse(this.defaultReportService.update(this.defaultReport));
        } else {
            this.subscribeToSaveResponse(this.defaultReportService.create(this.defaultReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDefaultReport>>) {
        result.subscribe((res: HttpResponse<IDefaultReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get defaultReport() {
        return this._defaultReport;
    }

    set defaultReport(defaultReport: IDefaultReport) {
        this._defaultReport = defaultReport;
    }
}
