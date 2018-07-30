import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';

@Component({
    selector: 'jhi-order-professional-license-form-detail',
    templateUrl: './order-professional-license-form-detail.component.html'
})
export class OrderProfessionalLicenseFormDetailComponent implements OnInit {
    orderProfessionalLicenseForm: IOrderProfessionalLicenseForm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderProfessionalLicenseForm }) => {
            this.orderProfessionalLicenseForm = orderProfessionalLicenseForm;
        });
    }

    previousState() {
        window.history.back();
    }
}
