import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderForm } from 'app/shared/model/order-form.model';

@Component({
    selector: 'jhi-order-form-detail',
    templateUrl: './order-form-detail.component.html'
})
export class OrderFormDetailComponent implements OnInit {
    orderForm: IOrderForm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderForm }) => {
            this.orderForm = orderForm;
        });
    }

    previousState() {
        window.history.back();
    }
}
