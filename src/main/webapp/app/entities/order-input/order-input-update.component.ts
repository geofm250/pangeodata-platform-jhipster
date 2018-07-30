import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderInput } from 'app/shared/model/order-input.model';
import { OrderInputService } from './order-input.service';

@Component({
    selector: 'jhi-order-input-update',
    templateUrl: './order-input-update.component.html'
})
export class OrderInputUpdateComponent implements OnInit {
    private _orderInput: IOrderInput;
    isSaving: boolean;

    constructor(private orderInputService: OrderInputService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderInput }) => {
            this.orderInput = orderInput;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderInput.id !== undefined) {
            this.subscribeToSaveResponse(this.orderInputService.update(this.orderInput));
        } else {
            this.subscribeToSaveResponse(this.orderInputService.create(this.orderInput));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderInput>>) {
        result.subscribe((res: HttpResponse<IOrderInput>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderInput() {
        return this._orderInput;
    }

    set orderInput(orderInput: IOrderInput) {
        this._orderInput = orderInput;
    }
}
