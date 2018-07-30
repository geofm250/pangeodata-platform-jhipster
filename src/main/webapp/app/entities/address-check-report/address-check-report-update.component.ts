import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAddressCheckReport } from 'app/shared/model/address-check-report.model';
import { AddressCheckReportService } from './address-check-report.service';

@Component({
    selector: 'jhi-address-check-report-update',
    templateUrl: './address-check-report-update.component.html'
})
export class AddressCheckReportUpdateComponent implements OnInit {
    private _addressCheckReport: IAddressCheckReport;
    isSaving: boolean;

    constructor(private addressCheckReportService: AddressCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ addressCheckReport }) => {
            this.addressCheckReport = addressCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.addressCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.addressCheckReportService.update(this.addressCheckReport));
        } else {
            this.subscribeToSaveResponse(this.addressCheckReportService.create(this.addressCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAddressCheckReport>>) {
        result.subscribe((res: HttpResponse<IAddressCheckReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get addressCheckReport() {
        return this._addressCheckReport;
    }

    set addressCheckReport(addressCheckReport: IAddressCheckReport) {
        this._addressCheckReport = addressCheckReport;
    }
}
