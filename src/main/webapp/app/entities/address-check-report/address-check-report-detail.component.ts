import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressCheckReport } from 'app/shared/model/address-check-report.model';

@Component({
    selector: 'jhi-address-check-report-detail',
    templateUrl: './address-check-report-detail.component.html'
})
export class AddressCheckReportDetailComponent implements OnInit {
    addressCheckReport: IAddressCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ addressCheckReport }) => {
            this.addressCheckReport = addressCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
