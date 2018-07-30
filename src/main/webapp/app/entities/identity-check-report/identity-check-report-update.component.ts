import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IIdentityCheckReport } from 'app/shared/model/identity-check-report.model';
import { IdentityCheckReportService } from './identity-check-report.service';

@Component({
    selector: 'jhi-identity-check-report-update',
    templateUrl: './identity-check-report-update.component.html'
})
export class IdentityCheckReportUpdateComponent implements OnInit {
    private _identityCheckReport: IIdentityCheckReport;
    isSaving: boolean;

    constructor(private identityCheckReportService: IdentityCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ identityCheckReport }) => {
            this.identityCheckReport = identityCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.identityCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.identityCheckReportService.update(this.identityCheckReport));
        } else {
            this.subscribeToSaveResponse(this.identityCheckReportService.create(this.identityCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIdentityCheckReport>>) {
        result.subscribe((res: HttpResponse<IIdentityCheckReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get identityCheckReport() {
        return this._identityCheckReport;
    }

    set identityCheckReport(identityCheckReport: IIdentityCheckReport) {
        this._identityCheckReport = identityCheckReport;
    }
}
