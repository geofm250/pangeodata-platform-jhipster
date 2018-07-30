import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderEducationForm } from 'app/shared/model/order-education-form.model';

@Component({
    selector: 'jhi-order-education-form-detail',
    templateUrl: './order-education-form-detail.component.html'
})
export class OrderEducationFormDetailComponent implements OnInit {
    orderEducationForm: IOrderEducationForm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderEducationForm }) => {
            this.orderEducationForm = orderEducationForm;
        });
    }

    previousState() {
        window.history.back();
    }
}
