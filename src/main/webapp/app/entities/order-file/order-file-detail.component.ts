import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderFile } from 'app/shared/model/order-file.model';

@Component({
    selector: 'jhi-order-file-detail',
    templateUrl: './order-file-detail.component.html'
})
export class OrderFileDetailComponent implements OnInit {
    orderFile: IOrderFile;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderFile }) => {
            this.orderFile = orderFile;
        });
    }

    previousState() {
        window.history.back();
    }
}
