import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderFile } from 'app/shared/model/order-file.model';
import { OrderFileService } from './order-file.service';

@Component({
    selector: 'jhi-order-file-update',
    templateUrl: './order-file-update.component.html'
})
export class OrderFileUpdateComponent implements OnInit {
    private _orderFile: IOrderFile;
    isSaving: boolean;

    constructor(private orderFileService: OrderFileService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderFile }) => {
            this.orderFile = orderFile;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderFile.id !== undefined) {
            this.subscribeToSaveResponse(this.orderFileService.update(this.orderFile));
        } else {
            this.subscribeToSaveResponse(this.orderFileService.create(this.orderFile));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderFile>>) {
        result.subscribe((res: HttpResponse<IOrderFile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderFile() {
        return this._orderFile;
    }

    set orderFile(orderFile: IOrderFile) {
        this._orderFile = orderFile;
    }
}
