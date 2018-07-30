import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILicenseCheckReport } from 'app/shared/model/license-check-report.model';
import { LicenseCheckReportService } from './license-check-report.service';

@Component({
    selector: 'jhi-license-check-report-update',
    templateUrl: './license-check-report-update.component.html'
})
export class LicenseCheckReportUpdateComponent implements OnInit {
    private _licenseCheckReport: ILicenseCheckReport;
    isSaving: boolean;

    constructor(private licenseCheckReportService: LicenseCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ licenseCheckReport }) => {
            this.licenseCheckReport = licenseCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.licenseCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.licenseCheckReportService.update(this.licenseCheckReport));
        } else {
            this.subscribeToSaveResponse(this.licenseCheckReportService.create(this.licenseCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILicenseCheckReport>>) {
        result.subscribe((res: HttpResponse<ILicenseCheckReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get licenseCheckReport() {
        return this._licenseCheckReport;
    }

    set licenseCheckReport(licenseCheckReport: ILicenseCheckReport) {
        this._licenseCheckReport = licenseCheckReport;
    }
}
