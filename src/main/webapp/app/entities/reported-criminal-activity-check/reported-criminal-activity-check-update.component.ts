import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';
import { ReportedCriminalActivityCheckService } from './reported-criminal-activity-check.service';

@Component({
    selector: 'jhi-reported-criminal-activity-check-update',
    templateUrl: './reported-criminal-activity-check-update.component.html'
})
export class ReportedCriminalActivityCheckUpdateComponent implements OnInit {
    private _reportedCriminalActivityCheck: IReportedCriminalActivityCheck;
    isSaving: boolean;

    constructor(
        private reportedCriminalActivityCheckService: ReportedCriminalActivityCheckService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reportedCriminalActivityCheck }) => {
            this.reportedCriminalActivityCheck = reportedCriminalActivityCheck;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reportedCriminalActivityCheck.id !== undefined) {
            this.subscribeToSaveResponse(this.reportedCriminalActivityCheckService.update(this.reportedCriminalActivityCheck));
        } else {
            this.subscribeToSaveResponse(this.reportedCriminalActivityCheckService.create(this.reportedCriminalActivityCheck));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReportedCriminalActivityCheck>>) {
        result.subscribe(
            (res: HttpResponse<IReportedCriminalActivityCheck>) => this.onSaveSuccess(),
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
    get reportedCriminalActivityCheck() {
        return this._reportedCriminalActivityCheck;
    }

    set reportedCriminalActivityCheck(reportedCriminalActivityCheck: IReportedCriminalActivityCheck) {
        this._reportedCriminalActivityCheck = reportedCriminalActivityCheck;
    }
}
