import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderInput } from 'app/shared/model/order-input.model';

@Component({
    selector: 'jhi-order-input-detail',
    templateUrl: './order-input-detail.component.html'
})
export class OrderInputDetailComponent implements OnInit {
    orderInput: IOrderInput;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderInput }) => {
            this.orderInput = orderInput;
        });
    }

    previousState() {
        window.history.back();
    }
}
