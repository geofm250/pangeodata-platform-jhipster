import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProductCountry } from 'app/shared/model/product-country.model';
import { ProductCountryService } from './product-country.service';

@Component({
    selector: 'jhi-product-country-update',
    templateUrl: './product-country-update.component.html'
})
export class ProductCountryUpdateComponent implements OnInit {
    private _productCountry: IProductCountry;
    isSaving: boolean;

    constructor(private productCountryService: ProductCountryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productCountry }) => {
            this.productCountry = productCountry;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productCountry.id !== undefined) {
            this.subscribeToSaveResponse(this.productCountryService.update(this.productCountry));
        } else {
            this.subscribeToSaveResponse(this.productCountryService.create(this.productCountry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProductCountry>>) {
        result.subscribe((res: HttpResponse<IProductCountry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get productCountry() {
        return this._productCountry;
    }

    set productCountry(productCountry: IProductCountry) {
        this._productCountry = productCountry;
    }
}
