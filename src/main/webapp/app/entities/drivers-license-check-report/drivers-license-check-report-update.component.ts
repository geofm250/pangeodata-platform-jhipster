import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';
import { DriversLicenseCheckReportService } from './drivers-license-check-report.service';

@Component({
    selector: 'jhi-drivers-license-check-report-update',
    templateUrl: './drivers-license-check-report-update.component.html'
})
export class DriversLicenseCheckReportUpdateComponent implements OnInit {
    private _driversLicenseCheckReport: IDriversLicenseCheckReport;
    isSaving: boolean;

    constructor(private driversLicenseCheckReportService: DriversLicenseCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ driversLicenseCheckReport }) => {
            this.driversLicenseCheckReport = driversLicenseCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.driversLicenseCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.driversLicenseCheckReportService.update(this.driversLicenseCheckReport));
        } else {
            this.subscribeToSaveResponse(this.driversLicenseCheckReportService.create(this.driversLicenseCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDriversLicenseCheckReport>>) {
        result.subscribe(
            (res: HttpResponse<IDriversLicenseCheckReport>) => this.onSaveSuccess(),
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
    get driversLicenseCheckReport() {
        return this._driversLicenseCheckReport;
    }

    set driversLicenseCheckReport(driversLicenseCheckReport: IDriversLicenseCheckReport) {
        this._driversLicenseCheckReport = driversLicenseCheckReport;
    }
}
