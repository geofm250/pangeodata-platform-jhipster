import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductCountry } from 'app/shared/model/product-country.model';

@Component({
    selector: 'jhi-product-country-detail',
    templateUrl: './product-country-detail.component.html'
})
export class ProductCountryDetailComponent implements OnInit {
    productCountry: IProductCountry;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productCountry }) => {
            this.productCountry = productCountry;
        });
    }

    previousState() {
        window.history.back();
    }
}
