import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderForm } from 'app/shared/model/order-form.model';
import { OrderFormService } from './order-form.service';

@Component({
    selector: 'jhi-order-form-delete-dialog',
    templateUrl: './order-form-delete-dialog.component.html'
})
export class OrderFormDeleteDialogComponent {
    orderForm: IOrderForm;

    constructor(private orderFormService: OrderFormService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.orderFormService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderFormListModification',
                content: 'Deleted an orderForm'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-form-delete-popup',
    template: ''
})
export class OrderFormDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderForm }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderFormDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.orderForm = orderForm;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
