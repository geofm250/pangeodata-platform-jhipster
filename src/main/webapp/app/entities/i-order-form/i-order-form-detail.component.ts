import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIOrderForm } from 'app/shared/model/i-order-form.model';

@Component({
    selector: 'jhi-i-order-form-detail',
    templateUrl: './i-order-form-detail.component.html'
})
export class IOrderFormDetailComponent implements OnInit {
    iOrderForm: IIOrderForm;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iOrderForm }) => {
            this.iOrderForm = iOrderForm;
        });
    }

    previousState() {
        window.history.back();
    }
}
