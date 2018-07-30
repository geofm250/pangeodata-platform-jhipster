import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderForm } from 'app/shared/model/order-form.model';
import { OrderFormService } from './order-form.service';

@Component({
    selector: 'jhi-order-form-update',
    templateUrl: './order-form-update.component.html'
})
export class OrderFormUpdateComponent implements OnInit {
    private _orderForm: IOrderForm;
    isSaving: boolean;

    constructor(private orderFormService: OrderFormService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderForm }) => {
            this.orderForm = orderForm;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderForm.id !== undefined) {
            this.subscribeToSaveResponse(this.orderFormService.update(this.orderForm));
        } else {
            this.subscribeToSaveResponse(this.orderFormService.create(this.orderForm));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderForm>>) {
        result.subscribe((res: HttpResponse<IOrderForm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderForm() {
        return this._orderForm;
    }

    set orderForm(orderForm: IOrderForm) {
        this._orderForm = orderForm;
    }
}
