import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderEmploymentForm } from 'app/shared/model/order-employment-form.model';
import { OrderEmploymentFormService } from './order-employment-form.service';

@Component({
    selector: 'jhi-order-employment-form-update',
    templateUrl: './order-employment-form-update.component.html'
})
export class OrderEmploymentFormUpdateComponent implements OnInit {
    private _orderEmploymentForm: IOrderEmploymentForm;
    isSaving: boolean;

    constructor(private orderEmploymentFormService: OrderEmploymentFormService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderEmploymentForm }) => {
            this.orderEmploymentForm = orderEmploymentForm;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderEmploymentForm.id !== undefined) {
            this.subscribeToSaveResponse(this.orderEmploymentFormService.update(this.orderEmploymentForm));
        } else {
            this.subscribeToSaveResponse(this.orderEmploymentFormService.create(this.orderEmploymentForm));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderEmploymentForm>>) {
        result.subscribe((res: HttpResponse<IOrderEmploymentForm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderEmploymentForm() {
        return this._orderEmploymentForm;
    }

    set orderEmploymentForm(orderEmploymentForm: IOrderEmploymentForm) {
        this._orderEmploymentForm = orderEmploymentForm;
    }
}
