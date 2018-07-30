import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderEmploymentForm } from 'app/shared/model/order-employment-form.model';

@Component({
    selector: 'jhi-order-employment-form-detail',
    templateUrl: './order-employment-form-detail.component.html'
})
export class OrderEmploymentFormDetailComponent implements OnInit {
    orderEmploymentForm: IOrderEmploymentForm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderEmploymentForm }) => {
            this.orderEmploymentForm = orderEmploymentForm;
        });
    }

    previousState() {
        window.history.back();
    }
}
